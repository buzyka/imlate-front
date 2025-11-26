<template>
  <div class="grid gap">

    <!-- 📌 TABLE OF USERS -->
    <el-card>
      <template #header><b>Users</b></template>

      <el-input v-model="q" placeholder="Search by name or email" clearable class="mb-2" />

      <el-table :data="filtered" border style="width: 100%" highlight-current-row @current-change="selectRow">
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="name" label="Name" />
        <el-table-column label="QRkod">
          <template #default="scope">
            <div v-if="scope.row.QRkod?.length">
              <el-tag v-for="(qr, i) in scope.row.QRkod" :key="i" size="small" style="margin-right: 4px;">
                {{ qr }}
              </el-tag>
            </div>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="Email" />

        <el-table-column prop="active" label="Active" width="80">
          <template #default="scope">
            <el-tag v-if="scope.row.active">Yes</el-tag>
            <el-tag type="info" v-else>No</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="Actions" width="160">
          <template #default="scope">
            <el-button size="small" @click="editInline(scope.row)">Edit</el-button>
            <el-button size="small" @click="editDialog(scope.row)">EditD</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>


    <!-- 📌 FORM — CREATE/EDIT -->
    <el-card>
      <template #header><b>Create / Edit User</b></template>

      <el-form :model="form" label-position="top">

        <el-form-item label="Name">
          <el-input v-model="form.name" />
        </el-form-item>

        <!-- QR INPUT -->
        <el-form-item label="Add QR code">
          <el-input v-model="newQR" placeholder="QR value" ref="QRkodInput" />
          <el-button type="primary" @click="addQR" style="margin-left: 8px">Add</el-button>
        </el-form-item>

        <!-- QR LIST TABLE -->
        <el-table v-if="form.QRkod.length" :data="form.QRkod" border style="margin-bottom: 12px">
          <el-table-column label="QR Code">
            <template #default="scope">{{ scope.row }}</template>
          </el-table-column>

          <el-table-column label="Delete" width="70">
            <template #default="scope">
              <el-button type="danger" size="small" @click="removeQR(scope.$index)">X</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-form-item label="Email">
          <el-input v-model="form.email" />
        </el-form-item>

        <el-form-item label="Active">
          <el-switch v-model="form.active" />
        </el-form-item>

        <div class="flex gap">
          <el-button type="primary" @click="save">{{ form.id ? 'Update' : 'Create' }}</el-button>
          <el-button @click="reset">Reset</el-button>
        </div>
      </el-form>
    </el-card>


    <!-- 📌 EDIT DIALOG -->
    <el-dialog title="Edit User" v-model="dialogVisible" width="450px">
      <el-form label-position="top">

        <el-form-item label="Name">
          <el-input v-model="editForm.name" />
        </el-form-item>

        <el-form-item label="Email">
          <el-input v-model="editForm.email" />
        </el-form-item>

        <el-form-item label="Add QR code">
          <el-input v-model="editNewQR" placeholder="QR value" />
          <el-button size="small" @click="editAddQR">Add</el-button>
        </el-form-item>

        <el-table v-if="editForm.QRkod.length" :data="editForm.QRkod" border>
          <el-table-column label="QR">
            <template #default="scope">{{ scope.row }}</template>
          </el-table-column>
          <el-table-column width="70">
            <template #default="scope">
              <el-button type="danger" size="small" @click="editRemoveQR(scope.$index)">X</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-form-item label="Active">
          <el-switch v-model="editForm.active" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible=false">Cancel</el-button>
        <el-button type="primary" @click="saveEdit">Save</el-button>
      </template>
    </el-dialog>

  </div>
</template>



<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import api from '../services/api.js'

/* MAIN STATE */
const users = ref([])
const q = ref('')
const form = ref({ id:null, name:'', email:'', QRkod:[], active:true })
const newQR = ref("")
const QRkodInput = ref(null)

/* SEARCH */
const filtered = computed(()=> !q.value ? users.value :
  users.value.filter(u=> (u.name+u.email).toLowerCase().includes(q.value.toLowerCase()))
)

/* LOAD */
onMounted(refresh)
async function refresh(){
  try{
    const {data} = await api.get('/users')
    users.value = data
  }catch{
    users.value = [
      {id:1, name:"Alice", email:"alice@mail.com", QRkod:["A1","A2"], active:true},
      {id:2, name:"Bob", email:"bob@mail.com", QRkod:["B1"], active:false},
      {id:3, name:"Test", email:"t@mail.com", QRkod:[], active:true},
    ]
  }
}


/* EDIT INLINE */
function editInline(row){
  form.value = {...row, QRkod:[...row.QRkod]}   // копия массива
  nextTick(()=> QRkodInput.value?.focus())
}

/* ADD / REMOVE QR */
function addQR(){
  if(!newQR.value.trim()) return
  form.value.QRkod.push(newQR.value.trim())
  newQR.value = ""
}
function removeQR(i){ form.value.QRkod.splice(i,1) }


/* SAVE (CREATE + UPDATE) */
async function save(){

  // safety — make sure QRkod is array of strings
  form.value.QRkod = (form.value.QRkod||[]).map(q=>String(q).trim()).filter(q=>q)

  if(form.value.id){   // UPDATE ------------------------
    try{
      const {data} = await api.put(`/users/${form.value.id}`, form.value)
      const i = users.value.findIndex(u=>u.id===data.id)
      if(i>=0) users.value.splice(i,1,data)
    }catch{
      const i = users.value.findIndex(u=>u.id===form.value.id)
      if(i>=0) users.value.splice(i,1,{...form.value})
    }
  }else{               // CREATE ------------------------
    try{
      const {data} = await api.post('/users', form.value)
      users.value.push(data)
    }catch{
      const id = users.value.length ? Math.max(...users.value.map(u=>u.id))+1 : 1
      users.value.push({...form.value,id})
    }
  }

  reset()
}


/* RESET */
function reset(){
  form.value = { id:null, name:'', email:'', QRkod:[], active:true }
  newQR.value = ""
}




/* DIALOG EDITOR */
const dialogVisible = ref(false)
const editForm = ref({ id:null, name:'', email:'', QRkod:[], active:true })
const editNewQR = ref("")

function editDialog(user){
  editForm.value = {...user, QRkod:[...user.QRkod]}
  dialogVisible.value = true
}

function editAddQR(){
  if(!editNewQR.value.trim())return
  editForm.value.QRkod.push(editNewQR.value.trim())
  editNewQR.value=""
}
function editRemoveQR(i){ editForm.value.QRkod.splice(i,1) }

function saveEdit(){
  const i = users.value.findIndex(u=>u.id===editForm.value.id)
  if(i>=0) users.value.splice(i,1,{...editForm.value})
  dialogVisible.value=false
}


/* SELECT ROW */
const selectedRow = ref(null)
function selectRow(row){
  selectedRow.value=row
  editInline(row)
}
</script>



<style scoped>
.grid{display:grid;grid-template-columns:1fr 360px;gap:16px;}
.flex{display:flex;align-items:center;gap:8px;}
.mb-2{margin-bottom:12px;}
@media(max-width:900px){.grid{grid-template-columns:1fr;}}
</style>

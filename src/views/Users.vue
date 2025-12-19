<template>
  <div class="grid gap">

    <!-- USERS TABLE -->
    <el-card>
      <template #header><b>Users</b></template>

      <el-input
        v-model="q"
        placeholder="Search by name or email"
        clearable
        class="mb-2"
      />

      <el-table
        :data="filtered"
        border
        highlight-current-row
        @current-change="selectRow"
        @row-dblclick="openAddQRDialog"
      >
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="name" label="Name" />

        <el-table-column label="QR codes">
          <template #default="scope">
            <div class="qr-wrap">
              <template v-for="(qr, i) in scope.row.QRkod" :key="i">
                <input
                  v-if="scope.row._edit === i"
                  v-model="scope.row.QRkod[i]"
                  :ref="el => qrInputRefs[scope.row.id + '-' + i] = el"
                  @blur="scope.row._edit = null"
                  @keyup.enter="scope.row._edit = null"
                  class="qr-input"
                />
                <span v-else @dblclick="enableEdit(scope.row, i)">
                  <el-tag
                    size="small"
                    closable
                    @close="scope.row.QRkod.splice(i, 1)"
                  >
                    {{ qr }}
                  </el-tag>
                </span>
              </template>

              <el-button
                size="small"
                type="primary"
                class="add-btn"
                @click="addQRinTable(scope.row)"
              >
                +
              </el-button>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="email" label="Email" />
        <el-table-column label="Active" width="80">
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

    <!-- CREATE / EDIT FORM -->
    <el-card>
      <template #header><b>Create / Edit User</b></template>

      <el-form label-position="top">
        <el-form-item label="Name">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="QR code Add" class="qr-input-row">
          <el-input v-model="newQR" ref="QRkodInput" />
          <el-button type="primary" @click="addQR">Add</el-button>
        </el-form-item>

        <el-table
          v-if="form.QRkod.length"
          :data="form.QRkod"
          border
          class="mb-2"
        >
          <el-table-column label="QR Code">
            <template #default="scope">{{ scope.row }}</template>
          </el-table-column>
          <el-table-column width="70">
            <template #default="scope">
              <el-button size="small" type="danger" @click="removeQR(scope.$index)">
                X
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-form-item label="Email">
          <el-input v-model="form.email" />
        </el-form-item>

        <el-form-item label="Active">
          <el-switch v-model="form.active" />
        </el-form-item>

        <div class="flex">
          <el-button type="primary" @click="save">
            {{ form.id ? 'Update' : 'Create' }}
          </el-button>
          <el-button @click="reset">Reset</el-button>
        </div>
      </el-form>
    </el-card>

    <!-- EDIT DIALOG -->
    <el-dialog v-model="dialogVisible" title="Edit User" width="450px">
      <el-form label-position="top">
        <el-form-item label="Name">
          <el-input v-model="editForm.name" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="editForm.email" />
        </el-form-item>
        <el-form-item label="Add QR code">
          <el-input v-model="editNewQR" />
          <el-button size="small" @click="editAddQR">Add</el-button>
        </el-form-item>
        <el-table v-if="editForm.QRkod.length" :data="editForm.QRkod" border>
          <el-table-column label="QR">
            <template #default="scope">{{ scope.row }}</template>
          </el-table-column>
          <el-table-column width="70">
            <template #default="scope">
              <el-button size="small" type="danger" @click="editRemoveQR(scope.$index)">
                X
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item label="Active">
          <el-switch v-model="editForm.active" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveEdit">Save</el-button>
      </template>
    </el-dialog>

    <!-- ADD QR DIALOG (Double click) -->
    <el-dialog
      v-model="qrDialogVisible"
      title="Add QR code"
      width="300px"
      :close-on-click-modal="false"
      @opened="focusQRInput"
    >
      <el-input
        v-model="newQRForUser"
        placeholder="Enter QR code"
        @keyup.enter="confirmAddQR"
        ref="qrDialogInput"
      />
      <template #footer>
        <el-button @click="qrDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmAddQR">Add</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import api from '../services/api.js'

/* STATE */
const users = ref([])
const q = ref('')

/* MAIN FORM */
const form = ref({ id:null, name:'', email:'', QRkod:[], active:true })
const newQR = ref('')
const QRkodInput = ref(null)

/* INLINE EDIT */
const qrInputRefs = ref({})
function enableEdit(row, i) {
  row._edit = i
  nextTick(() => {
    const key = row.id + '-' + i
    qrInputRefs.value[key]?.focus()
  })
}

/* SEARCH */
const filtered = computed(() =>
  !q.value ? users.value :
  users.value.filter(u => (u.name + u.email).toLowerCase().includes(q.value.toLowerCase()))
)

/* LOAD USERS */
onMounted(refresh)
async function refresh() {
  try {
    const {data} = await api.get('/users')
    users.value = data
  } catch {
    users.value = [
      {id:1,name:"Alice",email:"alice@mail.com",QRkod:["A1","A2"],active:true},
      {id:2,name:"Bob",email:"bob@mail.com",QRkod:["B1"],active:false},
      {id:3,name:"Test",email:"t@mail.com",QRkod:[],active:true},
    ]
  }
}

/* INLINE EDIT FORM */
function editInline(row){
  Object.assign(form.value, {
    id: row.id,
    name: row.name,
    email: row.email,
    active: row.active,
    QRkod: [...row.QRkod]
  })
  nextTick(()=> QRkodInput.value?.focus())
}

/* QR ADD / REMOVE */
function addQR(){ if(!newQR.value.trim()) return; form.value.QRkod.push(newQR.value.trim()); newQR.value="" }
function removeQR(i){ form.value.QRkod.splice(i,1) }
function addQRinTable(row){
  if(!row.QRkod) row.QRkod=[]
  row.QRkod.push("")
  row._edit = row.QRkod.length - 1
  nextTick(()=>{ const key = row.id + '-' + row._edit; qrInputRefs.value[key]?.focus() })
}

/* SAVE */
function save(){
  form.value.QRkod = form.value.QRkod.map(q=>q.trim()).filter(Boolean)
  if(form.value.id){
    const i = users.value.findIndex(u=>u.id===form.value.id)
    if(i>=0) users.value.splice(i,1,{ ...form.value })
  } else {
    const id = users.value.length ? Math.max(...users.value.map(u=>u.id))+1 : 1
    users.value.push({ ...form.value, id })
  }
  reset()
}
function reset(){ Object.assign(form.value,{id:null,name:'',email:'',QRkod:[],active:true}); newQR.value="" }

/* EDIT DIALOG */
const dialogVisible = ref(false)
const editForm = ref({ id:null,name:'',email:'',QRkod:[],active:true })
const editNewQR = ref("")
function editDialog(u){ Object.assign(editForm.value,{ id:u.id,name:u.name,email:u.email,active:u.active,QRkod:[...u.QRkod] }); dialogVisible.value=true }
function editAddQR(){ if(editNewQR.value.trim()) editForm.value.QRkod.push(editNewQR.value.trim()); editNewQR.value="" }
function editRemoveQR(i){ editForm.value.QRkod.splice(i,1) }
function saveEdit(){ const i = users.value.findIndex(u=>u.id===editForm.value.id); if(i>=0) users.value.splice(i,1,{...editForm.value}); dialogVisible.value=false }

/* ROW SELECT */
function selectRow(row){ editInline(row) }

/* DOUBLE CLICK ADD QR */
const qrDialogVisible = ref(false)
const newQRForUser = ref('')
const selectedUser = ref(null)

function openAddQRDialog(row){
  selectedUser.value = row
  newQRForUser.value = ''
  qrDialogVisible.value = true
}

function confirmAddQR(){
  if(!newQRForUser.value.trim()) return
  selectedUser.value.QRkod.push(newQRForUser.value.trim())
  ElMessage.success('Code added')
  setTimeout(()=> qrDialogVisible.value=false, 200)
}
// QR dialog input reference

const qrDialogInput = ref(null)
/**
 * Focus QR input after the dialog is opened.
 * Element Plus dialogs render asynchronously,
 * so focus must be applied using nextTick.
 */
function focusQRInput() {
  nextTick(() => {
    qrDialogInput.value?.focus()
  })
}
</script>

<style scoped>
.grid{display:grid;grid-template-columns:1fr 360px;gap:16px;}
.flex{display:flex;align-items:center;gap:8px;}
.mb-2{margin-bottom:12px;}
.qr-wrap{display:flex;flex-wrap:wrap;gap:4px;}
.qr-input{width:70px;border:1px solid #aaa;border-radius:4px;padding:2px;font-size:12px;}
.add-btn{padding:0 6px; min-width:24px; height:20px;}
.qr-input-row .el-form-item__content { display:flex;align-items:center;gap:8px; }
@media(max-width:900px){.grid{grid-template-columns:1fr;}}
</style>

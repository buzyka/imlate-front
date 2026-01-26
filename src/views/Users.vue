<template>
  <div class="grid gap">

    <!-- USERS TABLE -->
    <el-card>
      <template #header><b>Users</b></template>
       
  <el-row :gutter="16" class="mb-2">

    <el-col :span="8">
      <el-input
        v-model="q"
        placeholder="Search by name or grade"
        clearable
        class="mb-2"
      />
    </el-col>

    <el-col :span="8">
      <el-input
        v-model="qName"
        placeholder="Search by name"
        clearable
        class="mb-2"
      />
    </el-col>

    <el-col :span="8">
      <el-input
        v-model="qGrade"
        placeholder="Search by grade"
        clearable
        class="mb-2"
      />
    </el-col>


  </el-row>

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
               
                  <el-tag
                    size="small"
                    closable
                    @close="removeQRFromServer(scope.row, qr)"
                  >
                    {{ qr }}
                  </el-tag>
               
              </template>
             
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="grade" label="Grade" />
        <el-table-column label="Active" width="80">
          <template #default="scope">
            <el-tag v-if="scope.row.active">Yes</el-tag>
            <el-tag type="info" v-else>No</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="LatestUpdate" label="Latest update" width="160">
         <!-- <template #default="scope">
            <el-button size="small" @click="editInline(scope.row)">Edit</el-button>
           </template>-->
        </el-table-column>
      </el-table>
    </el-card>

    <!-- CREATE / EDIT FORM -->
    <el-card>
  <template #header><b>Create / Edit User</b></template>

  <el-image
    v-if="form.picture"
    :src="form.picture"
    
    style="width:120px;height:120px;border-radius:50%;margin-bottom:16px"
    fit="cover"
  />


  <el-form
    :model="form"
    label-position="left"
    label-width="120px"
  >
    <el-form-item label="Name">
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item label="Grade">
      <el-input v-model="form.grade" />
    </el-form-item>
    <el-form-item label="Latest Update">
      <el-input v-model="form.LatestUpdate" />
    </el-form-item>

    <el-form-item label="QR code Add">
      <el-row :gutter="8" style="width:100%">
        <el-col :span="16">
          <el-input v-model="newQR" />
        </el-col>
        <el-col :span="8">
          <el-button type="primary" style="width:100%" @click="addQR">
            Add
          </el-button>
        </el-col>
      </el-row>
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
          <el-button
            size="small"
            type="danger"
            @click="removeQR(scope.$index)"
          >
            X
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-form-item label="Active">
      <el-switch v-model="form.active" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="save">
        {{ form.id ? 'Update' : 'Create' }}
      </el-button>
      <el-button @click="reset">Reset</el-button>
    </el-form-item>
  </el-form>
</el-card>
    <!-- EDIT DIALOG -->
    <el-dialog v-model="dialogVisible" title="Edit User" width="450px">
      <el-form label-position="top">
        <el-form-item label="Name">
          <el-input v-model="editForm.name" />
        </el-form-item>
        <el-form-item label="Grade">
          <el-input v-model="editForm.grade" />
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
      :disabled="savingQR"
      @keyup.enter="confirmAddQR"
      ref="qrDialogInput"
    />
      <template #footer>
        <el-button @click="qrDialogVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          :loading="savingQR"
          :disabled="!newQRForUser.trim() || savingQR"
          @click="confirmAddQR">
           Add
        </el-button>
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
const qName = ref('')
const qGrade = ref('')  

/* MAIN FORM */
const form = ref({ id:null, name:'', grade:'', QRkod:[], LatestUpdate:'', active:true })
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
const filtered = computed(() => {
  if (!q.value) return users.value;

  // Разбиваем поисковую строку на слова, убираем пробелы и приводим к lower case
  const searchWords = q.value
    .toLowerCase()
    .split(' ')
    .map(word => word.replace(/\s+/g, '') )
    .filter(Boolean); // убираем пустые строки

  return users.value.filter(u => {
    // Объединяем поля, которые хотим искать
    const searchString = (u.name + u.grade).toLowerCase().replace(/\s+/g, '');
    // Проверяем: все слова из поисковой строки есть в searchString
    return searchWords.every(word => searchString.includes(word));
  });
});

/* LOAD USERS */
onMounted(refresh)
async function refresh() {
  try {
    const {data} = await api.get('/users')
    users.value = data
  } catch {
    users.value = [
      {id:1,name:"Alice",grade:"7 B",QRkod:["A1","A2"],active:true,LatestUpdate:"2023-01-01", picture:"/img/1.jpg" },
      {id:2,name:"Bob",grade:"7 B",QRkod:["B1"],active:false, LatestUpdate:"2023-01-02", picture:"/img/2.jpg" },
      {id:3,name:"Test",grade:"8 A",QRkod:[],active:true, LatestUpdate:"2023-01-03", picture:"/img/3.jpg" },
      {id:4,name:"Aalice",grade:"8 B",QRkod:["A1","A2"],active:true, LatestUpdate:"2023-01-04", picture:"/img/4.jpg" },
      {id:5,name:"Brad",grade:"7B",QRkod:["B1"],active:false , LatestUpdate:"2023-01-05", picture:"/img/5.jpg"},
      {id:6,name:"Test Brad",grade:"7B",QRkod:[],active:true , LatestUpdate:"2023-01-06", picture:"/img/6.jpg"},
    ]
  }
}

/* INLINE EDIT FORM */
function editInline(row){
  Object.assign(form.value, {
    id: row.id,
    name: row.name,
    grade: row.grade,
    active: row.active,
    QRkod: [...row.QRkod],
    picture: row.picture
  })
  nextTick(()=> QRkodInput.value?.focus())
}

/* QR ADD / REMOVE */
function addQR(){ if(!newQR.value.trim()) return; form.value.QRkod.push(newQR.value.trim()); newQR.value="" }
function removeQR(i){ form.value.QRkod.splice(i,1) }


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
function reset(){ Object.assign(form.value,{id:null,name:'',grade:'',QRkod:[],active:true}); newQR.value="" }

/* EDIT DIALOG */
const dialogVisible = ref(false)
const editForm = ref({ id:null,name:'',grade:'',QRkod:[],active:true })
const editNewQR = ref("")
function editAddQR(){ if(editNewQR.value.trim()) editForm.value.QRkod.push(editNewQR.value.trim()); editNewQR.value="" }
function editRemoveQR(i){ editForm.value.QRkod.splice(i,1) }
function saveEdit(){ const i = users.value.findIndex(u=>u.id===editForm.value.id); if(i>=0) users.value.splice(i,1,{...editForm.value}); dialogVisible.value=false }

/* ROW SELECT */
function selectRow(row){
  if (!row) return
  editInline(row)
}

/* DOUBLE CLICK ADD QR */
const qrDialogVisible = ref(false)
const newQRForUser = ref('')
const selectedUser = ref(null)

function openAddQRDialog(row){
  selectedUser.value = row
  newQRForUser.value = ''
  qrDialogVisible.value = true
}

// Adding a QR code to a user from the dialog and sending QR to server
const savingQR = ref(false)

async function confirmAddQR() {
  if (!selectedUser.value?.id) {
  ElMessage.error('User not selected')
  return
  }

  const qr = newQRForUser.value.trim()
  if (!qr || savingQR.value) return

  savingQR.value = true

  try {
    
    const { data } = await api.post(
      `/users/${selectedUser.value.id}/qr`,
      { qr }
    )

    // сервер — источник истины
    selectedUser.value.QRkod = data.QRkod

    ElMessage.success('QR saved')
    qrDialogVisible.value = false
  } catch (err) {
    console.error('ADD QR ERROR:', err.response?.data || err)
    ElMessage.error('Server error – check backend logs')
  } finally {
    savingQR.value = false
  }
}
async function removeQRFromServer(user, qr) {
  try {
    // send a request to the server
    await api.delete(`/users/${user.id}/qr`, { data: { qr } })

    // After successful removal, update the array locally.
    const index = user.QRkod.indexOf(qr)
    if (index !== -1) user.QRkod.splice(index, 1)

    ElMessage.success('QR deleted')
  } catch (err) {
    ElMessage.error(
      err.response?.data?.message || 'Failed to delete QR'
    )
  }
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

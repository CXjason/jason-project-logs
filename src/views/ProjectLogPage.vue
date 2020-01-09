<template>
	<div class="project-logs-page">
		<div class="header-wrapper">
			<div class="search-wrapper clearfix">
				<div class="search-item">
					项目：
					<el-select v-model="searchProjectPk" placeholder="请选择" size="mini">
				    <el-option
				    	v-for="item in projectListData"
				    	:key="item.pk"
				      :label="item.name"
				      :value="item.pk">
				    </el-option>
				  </el-select>
				  <el-button size="small" style="margin-left: 10px;">搜索</el-button>
				</div>
				<el-button size="small" class="addName" @click="addFn">添加</el-button>
			</div>
		</div>
		<div class="content-wrapper">
			
			<div class="table-list-wrapper">
				<el-table
					v-loading="loading"
					:data="projectLogsData"
					style="width: 100%">
					<el-table-column
						prop="date"
						label="项目名称"
						width="180">
						<template slot-scope="scope">
							<span> {{ scope.row.project_name }} </span>
						</template>
					</el-table-column>
					<el-table-column
						label="版本号"
						width="180">
						<template slot-scope="scope">
							<span> {{ scope.row.version }} </span>
						</template>
					</el-table-column>
					<el-table-column
						label="更新内容">
						<template slot-scope="scope">
							<span> {{ scope.row.update_content }} </span>
						</template>
					</el-table-column>
					<el-table-column
						label="更新人">
						<template slot-scope="scope">
							<span> {{ scope.row.update_user_name }} </span>
						</template>
					</el-table-column>
					<el-table-column
						label="备注">
						<template slot-scope="scope">
							<span> {{ scope.row.aemreks }} </span>
						</template>
					</el-table-column>
					<el-table-column
						label="操作">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="editFn(scope.row)">编辑</el-button>
							<el-button @click="deleteClick(scope.row.pk)" type="text" size="small">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>

			<div class="pagintion-wrapper">
				<el-pagination
		      @current-change="paginationChangeFn"
		      :current-page="currentPage"
		      :page-size="pageSize"
		      layout="total, prev, pager, next, jumper"
		      :total="totalNum">
		    </el-pagination>
			</div>

		</div>
		<!-- 添加弹框 -->
		<el-dialog
			:visible.sync="dialogVisible"
			width="40%"
			title="新增内容">
			<el-form :model="form">
				<el-form-item label="项目名称：" >
				<el-select v-model="form.project_name" placeholder="请选择项目名称" style="width: 76%">
					<el-option
				    	v-for="item in projectListData"
				    	:key="item.pk"
						:label="item.name"
						:value="item.name">
				    </el-option>
				</el-select>
				</el-form-item>
				<el-form-item label="版本号：" style="padding-left: 15px">
					<el-input v-model="form.version" autocomplete="off" style="width: 78%"></el-input>
				</el-form-item>
				<el-form-item label="更新内容：">
					<el-input v-model="form.update_content" autocomplete="off" style="width: 76%"></el-input>
				</el-form-item>
				<el-form-item label="更新人：" style="padding-left: 15px">
					<el-input v-model="form.update_user_name" autocomplete="off" style="width: 78%"></el-input>
				</el-form-item>
				<el-form-item label="备注：" style="padding-left: 28px">
					<el-input v-model="form.aemreks" autocomplete="off" style="width: 80%"></el-input>
				</el-form-item>
			 </el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addForm">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 编辑弹框 -->
		<el-dialog
			:visible.sync="editaDialog"
			width="40%"
			title="编辑内容">
			<el-form :model="form">
				<el-form-item label="项目名称：" >
				<el-select v-model="form.project_name" placeholder="请选择项目名称" style="width: 76%">
					<el-option
				    	v-for="item in projectListData"
				    	:key="item.pk"
						:label="item.name"
						:value="item.name">
				    </el-option>
				</el-select>
				</el-form-item>
				<el-form-item label="版本号：" style="padding-left: 15px">
					<el-input v-model="form.version" autocomplete="off" style="width: 78%"></el-input>
				</el-form-item>
				<el-form-item label="更新内容：">
					<el-input v-model="form.update_content" autocomplete="off" style="width: 76%"></el-input>
				</el-form-item>
				<el-form-item label="更新人：" style="padding-left: 15px">
					<el-input v-model="form.update_user_name" autocomplete="off" style="width: 78%"></el-input>
				</el-form-item>
				<el-form-item label="备注：" style="padding-left: 28px">
					<el-input v-model="form.aemreks" autocomplete="off" style="width: 80%"></el-input>
				</el-form-item>
			 </el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="editaDialog = false">取 消</el-button>
				<el-button type="primary" @click="editSureFn">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script lang="ts">
	import { Component,Prop,Vue} from 'vue-property-decorator';
	//import Component from 'vue-class-component';

	@Component({
		components:{

		}
	})
	export default class ProjectLogPage extends Vue {
		private searchProjectPk: number | string = "";
		private projectLogsData: object[] = [];
		private projectListData: object[] = [];
		private currentPage: number = 1;
		private pageSize: number = 10;
		private totalNum: number = 0;
		private loading: boolean = true;//loading动画
		private dialogVisible: boolean =  false;//添加弹框
		private form: object = {
			update_user_name:"",
			update_user_pk: 1,
			version: "",
			project_name: "",
			project_pk: 1,
			update_content: "",
			aemreks: ""
		};
		// private editForm: object = {
		// 	update_user_name:"",
		// 	update_user_pk: 1,
		// 	version: "",
		// 	project_name: "",
		// 	project_pk: 1,
		// 	update_content: "",
		// 	aemreks: ""
		// };
		private editaDialog: boolean = false;//编辑弹框
		

    mounted(): void {

    	this.fetchProjectList();

    	this.fetchUpdateProjectLogsList();

	}
	
    /*
			获取项目更新内容列表
    */
    async fetchUpdateProjectLogsList(): Promise<void>{

		let params = {
			project_pk:this.searchProjectPk,
			page:this.currentPage,
			pageSize:this.pageSize
		};

    	let projectLogsRes = await this.$api.getUpdateProjectLogsList(params);

    	console.log("获取项目更新内容列表");
    	console.log(projectLogsRes);

    	if(projectLogsRes.data.code == 0){

			this.projectLogsData = projectLogsRes.data.data;
			this.totalNum = projectLogsRes.data.total;

    	};

    }

    /*
			获取项目列表
    */
    async fetchProjectList(): Promise<void>{

    	let projectListRes = await this.$api.getProjectList();

    	console.log("获取项目列表");
    	console.log(projectListRes);

    	if(projectListRes.data.code == 0){
			this.loading = false;
			this.projectListData = projectListRes.data.data;
			console.log(this.projectListData,"projectListData")
    	};

	}
	/*
			添加接口
    */
    async addForm(): void{
	    let params = {
			update_user_name:this.form.update_user_name,
			update_user_pk:this.form.update_user_pk,
			version:this.form.version,
			project_name: this.form.project_name,
			project_pk: this.form.project_pk,
			update_content: this.form.update_content,
			aemreks:this.form.aemreks

		};
		let formList = await this.$api.getAddUpdateProjectLogsItem(params);
		if(formList.data.code == 0){
			this.$message({
				type:"success",
				message:"添加成功"
			});
			this.dialogVisible = false;
			this.form= {}
			this.fetchUpdateProjectLogsList();
		}else{
			this.$message({
				type:"error",
				message:"添加失败"
			});
		}

    }
    /*
			切换页
    */
    async paginationChangeFn(page): void{

		console.log(page);
		
		this.fetchUpdateProjectLogsList();
	}
	/*
			编辑
    */
	async  editFn(row): void{
		this.editaDialog = true;
		let that = this;
		that.form.project_name = row.project_name;
		that.form.version =  row.version;
		that.form.update_content = row.update_content;
		that.form.update_user_name =  row.update_user_name;
		that.form.aemreks = row.aemreks;
        
	}
	/*
		编辑修改提交
	*/
	async editSureFn(): void{
	    let params = {
			update_user_name:this.form.update_user_name,
			update_user_pk:this.form.update_user_pk,
			version:this.form.version,
			project_name: this.form.project_name,
			project_pk: this.form.project_pk,
			update_content: this.form.update_content,
			aemreks:this.form.aemreks

		};
		let editFormList = await this.$api.getApdateProjectLogsItem(params);

		console.log("编辑提交");
		console.log(editFormList);

		if(editFormList.data.code == 0){
			this.$message({
				type:"success",
				message:"修改成功"
			});
			this.editaDialog = false;
			this.form= {};

			this.fetchUpdateProjectLogsList();
		}else{
			this.$message({
				type:"error",
				message:"修改失败"
			});
		}

    }

	/*
			删除
    */
	async deleteClick(pk): void{
		this.$confirm('是否要删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {

			let params = {
				pk:pk
			};
			let res = await this.$api.getRemoteUpdateProjectLogsItem(params);
			if(res.data.code == 0){
				this.$message({
					type:"success",
					message:"删除成功"
				});
				this.loading = true;
				setTimeout(()=>{
					this.loading= false;
					this.fetchUpdateProjectLogsList()
				},3000)
			}else{

			}

          
        }).catch(() => {
              
        });

		
	}
	/*
			添加
    */
    async addFn(): void{
		this.dialogVisible = true;
	}
	
	}
</script>

<style lang="scss">
	
	.project-logs-page{
		height:100%;
		position:relative;

		.header-wrapper{
			
			position:absolute;
			left:0;
			top:0;
			width:100%;
			height:60px;
			z-index:10;

			.search-wrapper{
				height:100%;
				display:flex;
				align-items:center;
				.search-item{
					font-size: 14px;
					float:left;
					margin-left:16px;
					.el-input__inner{
						height: 34px;
						line-height: 34px;
					}
				}
			}
		}
		.addName{
			right: 0;
			position: absolute;
		}

		.content-wrapper{
			position:relative;
			height:100%;
			padding-top:60px;
			box-sizing:border-box;


			.table-list-wrapper{
				position:relative;
				height:100%;
				padding-bottom:40px;
				box-sizing:border-box;
			}

			.pagintion-wrapper{
				position:absolute;
				left:0;
				bottom:0;
				width:100%;
				height:40px;
				z-index:10;
				text-align:center;
				padding-top:6px;
				box-sizing:border-box;
			}
		}

	}
</style>
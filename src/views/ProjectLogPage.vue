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
				</div>
			</div>
		</div>

		<div class="content-wrapper">
			
			<div class="table-list-wrapper">
				<el-table
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
			        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
			        <el-button type="text" size="small">编辑</el-button>
			      </template>
		      </el-table-column>
		    </el-table>
			</div>

			<div class="pagintion-wrapper">
				<el-pagination
		      @current-change="paginationChangeFn"
		      :current-page="currentPage"
		      :page-size="10"
		      layout="total, prev, pager, next, jumper"
		      :total="totalNum">
		    </el-pagination>
			</div>

		</div>
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
		private totalNum: number = 0;

    mounted(): void {

    	this.fetchProjectList();

    	this.fetchUpdateProjectLogsList();

    }
    /*
			获取项目更新内容列表
    */
    async fetchUpdateProjectLogsList(): Promise<void>{

    	let projectLogsRes = await this.$api.getUpdateProjectLogsList();

    	console.log("获取项目更新内容列表");
    	console.log(projectLogsRes);

    	if(projectLogsRes.data.code == 0){

    		this.projectLogsData = projectLogsRes.data.data;

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

    		this.projectListData = projectListRes.data.data;

    	};

    }

    /*
			切换页
    */
    async paginationChangeFn(page): void{

    	console.log(page)
    }
	}
</script>

<style lang="scss" scoped>
	
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

					float:left;
					margin-left:16px;
				}
			}
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
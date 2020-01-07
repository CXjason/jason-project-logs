<template>
  <div class="home-page">
    <div class="nav-wrapper">
    	<div class="nav-list">
    		<ul class="nav-list-ul">
    			<li class="nav-list-item">
    				<a href="javascript:;" class="nav-list-item-text">项目日志</a>
    			</li>
    		</ul>
    	</div>
    </div>
    <div class="content-wrapper">
    	<div class="top-nav-wrapper clearfix">
    		
    		<div class="right-info-wr fr">
    			<div class="name">jason</div>
    		</div>
    	</div>
    	<div class="router-content-wrapper">
    		<!-- 路由 -->
		    <keep-alive>
		      <router-view v-if="$route.meta.keepAlive"></router-view>
		    </keep-alive>

		    <router-view v-if="!$route.meta.keepAlive"></router-view>
    	</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'homePage',
  components: {
    HelloWorld
  }
}
</script>


<style lang="scss" scoped>

.home-page{
	height:100%;

	.nav-wrapper{
		width:120px;
		height:100%;
		background-color:#333;
		float:left;

		.nav-list{
			padding-top:60px;

			.nav-list-ul{

				.nav-list-item{

					.nav-list-item-text{
						display:block;
						height:36px;
						line-height:36px;
						text-align:center;
						color:#fff;
						font-size:14px;
					}
				}
			}
		}
	}

	.content-wrapper{
		overflow:hidden;
		height:100%;
		position:relative;

		.top-nav-wrapper{
			height:60px;
			width:100%;
			position:absolute;
			left:0;
			top:0;
			z-index:10;
			background-color:#333;

			.right-info-wr{
				padding-right:40px;
				font-size:16px;
				line-height:60px;
				color:#fff;
			}
		}

		.router-content-wrapper{
			height:100%;
			position:relative;
			padding-top:60px;
			box-sizing:border-box;
		}
	}

}
	
</style>


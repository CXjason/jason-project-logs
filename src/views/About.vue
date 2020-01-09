<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { Component,Prop,Vue} from 'vue-property-decorator';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class';

const userModule = namespace('user')

@Component({
	components:{

	}
})
export default class About extends Vue {
	@userModule.State(state => state.aa) stateAa;
  // @State(state => state.bar) stateBar
  @userModule.Getter('aa') getterAa;
  @userModule.Action('setAa') actionAa;
  @userModule.Mutation('commitAa') commitAa
  // @someModule.Getter('foo') moduleGetterFoo


  mounted():void{

  	setTimeout(() => {
			console.log(this.stateAa);

			this.actionAa("bb");

			console.log(this.getterAa)


  	},2000)
  	
  }
  
}

</script>


<style lang="scss" scoped>
	
	.about{

	}
</style>

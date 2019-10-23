<template>
  <!--<v-container fluid>
    <v-row align="start">
      <v-col cols="6">
        <patient />
      </v-col>
        <v-col cols="6">
          <v-row>
            <record/>
          </v-row>
        </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
          <orderList />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        
      </v-col>
    </v-row>
  </v-container>-->
  <div>
    <div v-drag class="drag patient"><patient/></div>
    <div v-drag class="drag orderList"><orderList/></div>
    <div v-drag class="drag record"><record/></div>
  </div>
</template>
<script>
import orderList from '../components/data/orderList'
import patient from '../components/data/patient'
import record from '../components/data/record'

export default {
  components: {
    orderList,
    patient,
    record
  },
  
  directives:{
				drag(el, bindings){
					el.onmousedown = function(e){
            /*console.log(el)
            if (el!=this.lastTouch){
              console.log(el)
              console.log(this.lastTouch)
              el.style.zIndex++
            } 
            this.lastTouch=el
            console.log(this.lastTouch)*/
						var disx = e.pageX - el.offsetLeft;
						var disy = e.pageY - el.offsetTop;
						document.onmousemove = function (e){
							el.style.left = e.pageX - disx + 'px';
							el.style.top = e.pageY - disy + 'px';
						}
						document.onmouseup = function(){
							document.onmousemove = document.onmouseup = null;
						}
					}
				}
			},

  data () {
    return {
      lastTouch: null
    }
  }
}
</script>
<style scoped>
.drag{
  width: 100%;
  height: auto;
  max-width: 45vw;
  position: absolute;
  -webkit-user-select:none;
  -moz-user-select:none;
  -o-user-select:none;
  user-select:none;
}
.drag:hover{
  width: 100%;
  height: auto;
  max-width: 45vw;
  cursor:pointer;
  position: absolute;
  -webkit-user-select:none;
  -moz-user-select:none;
  -o-user-select:none;
  user-select:none;
}
.patient{
  top:1%;
  left:1%
}
.orderList{
  bottom: 1%;
  left: 1%;
}
.record{
  right:1%;
  top:1%;
}
</style>
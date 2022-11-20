<template>
  <v-app>
    <v-main>
      <v-container>
          <search-component @onFetch="onFetch" :loanding="loanding" />
          <v-alert
            :value="alert"
            outlined
            text
            type="error"
            transition="scale-transition"
            style="margin:0 auto;max-width: 580px;"
          >
            {{message}}
          </v-alert>
          <transition name="component-fade" mode="out-in">
              <keep-alive>
                  <component :is='componentRender' v-bind:data="data" v-bind:languages="languages"></component>
              </keep-alive>
          </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SearchComponent from './components/SearchComponent.vue';
const DataComponent = () => import('./components/DataComponent.vue');
const LoaderComponent = () => import('./components/LoaderComponent.vue');

import { github } from './api/fetchGithub';
import { filterData } from './helpers/filterData';


export default {
  name: 'App',

  components: {
    SearchComponent,
  },

  data: () => ({
    data: [],
    loanding: false,
    alert: false,
    message: '',
    componentRender: '',
    languages: {
      chartOptions: {
        labels: [],
        colors: []
      },
      series: [],
    },
    
  }),
  methods: {
    async onFetch({topic, umbral}){
      this.loanding = true;
      this.componentRender = LoaderComponent;

      const { ok, data, message } = await github(topic);

      if( ok ){
        const { nodes, languages } = filterData(data, parseInt(umbral));
        this.data = nodes;

        if(languages.length > 0){
          languages.map((element) => {
            this.languages.chartOptions.labels.push(element.name);
            this.languages.chartOptions.colors.push(element.color);
            this.languages.series.push(element.count);
          })
        }

        if( this.data.length === 0 ){
          this.message = `No se encontraron repositorios, con el topic ${topic}`;
          this.alert = true;
        }
  
      }else{
        this.message = message;
        this.alert = true;
      }

     
      this.loanding = false;
      this.componentRender = ok && !this.alert ? DataComponent : '';

      setTimeout(() => {
        this.alert = false;
      }, 3000);
    }
  }
};
</script>

<style>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
{
opacity: 0;
}
</style>

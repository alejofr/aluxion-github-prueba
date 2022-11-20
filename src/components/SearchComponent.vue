<template>
  <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="onSubmit"
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="5"
        >
          <v-text-field
            v-model="topic"
            :rules="nameRules"
            label="Topic ó temas"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="5"
        >
          <v-text-field
            v-model="umbral"
            label="Cantidad de stargazers"
            :rules="umbralRules"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="2"
          style="display: flex;align-items: center;"
        >
          <v-btn
            :disabled="!valid || loanding"
            color="success"
            class="mr-4"
            type="submit"
          >
            Buscar
          </v-btn>
          <v-btn
            color="error"
            class="mr-4"
            @click="reset"
          >
            Reset
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
export default {
    name: 'SearchComponent',
    props: ['loanding'],
    data: () => ({
      valid: false,
      topic: '',
      umbral: '',
      nameRules: [
        v => !!v || 'Topic es requerido',
      ],
      umbralRules: [
        v => !!v || 'Stargazer es requerido',
        v => /^([0-9])*$/.test(v) || 'Stargazer debe ser numeros enteros',
      ],
    }),

    methods: {
      onSubmit () {
        if( this.valid ){
          console.log('aqui')
          this.$emit('onFetch', {topic: this.topic, umbral: this.umbral});
        }
      },
      reset(){
        this.$refs.form.reset()
      }
    },
};
</script>
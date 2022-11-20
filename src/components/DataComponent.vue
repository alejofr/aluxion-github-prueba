<template>
<v-row>
        <v-col
          cols="12"
          md="4"
        >
            <p>Stack más utilizados dentro de los 10 mejores repositorios</p>
            <apex-chart ref="donut" width="350" type="donut" :options="languages.chartOptions" :series="languages.series"></apex-chart>
        </v-col>
        <v-col>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left" style="width: 10%;">
                            Stargazer
                        </th>
                        <th class="text-center" style="width: 45%;">
                            Página de inicio
                        </th>
                        <th class="text-center" style="width: 45%;">
                            Url GitHub
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="(item, index) in data"
                        :key="index"
                        style="background-color: #f5faff;"
                        >
                        <td>{{ item.stargazerCount }}</td>
                        <td>{{ item.homepageUrl }}</td>
                        <td><a :href="item.url" target="_blank" rel="noopener noreferrer" class="nav-link">{{ item.url }}</a></td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
</v-row>
</template>
<script>
  export default {
    name: 'DataComponent',
    props: ['data', 'languages']
  }
</script>
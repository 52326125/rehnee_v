<template>
    <v-row>
        <v-col cols="12">
            <v-row justify="center">
        <v-col cols="6">
            <order/>
        </v-col>
        <v-col cols="6">
            <dashboard/>
        </v-col>
    </v-row>
        </v-col>
    <v-col cols="12">
        <patientList/>
    </v-col>
    </v-row>
</template>
<script>
import order from '../components/home/order-card'
import dashboard from '../components/home/dashboard-card'
import patientList from '../components/home/patientList-card'

export default {
    components:{
        order,
        dashboard,
        patientList
    },
}
</script>
<template>
    <div class="table_container">
        <table>
            <thead>
                <tr>
                    <th 
                        v-for="col in columns"
                        :key="col"
                    >
                        {{ col }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in rows" :key="index">
                    <td 
                        v-for="col in columns"
                        :key="col"
                    >
                        {{ row[col] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
    .table_container {
        display: flex;
        background-color: rgb(195, 195, 195);
        border: 1px solid rgb(111, 111, 111);
        border-radius: 15px;
        text-align: center;
        justify-content: center;
        margin-bottom: 1rem;
    }

    table {
        margin: 0 5px 5px 5px;
    }

    .table_container table {
        width: 80%;
        border-collapse: separate;
        border-spacing: 0 10px;
    }

    .table_container th {
        text-align: center;
        padding: 5px;
    }

    .table_container td {
        padding: 5px;
    }

    .table_container tbody tr {
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        font-size: 13px;
    }

    .table_container tbody td {
        padding: 8px 10px;
        min-width: 100px;
        min-height: 25px;
    }
</style>

<script setup lang="ts">
    const props = defineProps<{
        columns: string[]
        rows: Record<string, any>[]
    }>()
</script>
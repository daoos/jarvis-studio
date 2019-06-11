<template>
    <div>
        <v-toolbar
                dense
                color="primary"
                dark
                extended
                extension-height="300"
                flat
        >
            <v-toolbar-title class="mx-auto" slot="extension">
                <h2>Welcome to Jarvis Studio</h2>
                <span>Keep Calm and Ask for the Retail Data Butler.</span>
<!--                 <v-layout row>
                    <v-flex wrap>
                        <v-btn outline large fab color="white" class="outine-2">
                            <i class="fab fa-vuejs fa-3x"></i>
                        </v-btn>
                    </v-flex>
                    <v-flex wrap>
                        <v-btn outline large fab color="white" class="outine-2">
                            <i class="fab fa-node fa-3x"></i>
                        </v-btn>
                    </v-flex>
                    <v-flex wrap>
                        <v-btn outline large fab color="white" class="outine-2">
                            <i class="fab fa-laravel fa-2x"></i>
                        </v-btn>
                    </v-flex>
                </v-layout> -->
            </v-toolbar-title>
        </v-toolbar>

        <v-container>
            <v-layout row>
                <v-flex xs12 md8 offset-md2>
                    <v-card flat class="card--flex-toolbar" color="transparent">
                        <v-container fluid grid-list-lg>
                            <!-- <v-layout row wrap>
                                <v-flex xs12>
                                    <h2 class="white--text">Discover Firebase</h2>
                                </v-flex>
                            </v-layout> -->
                            <v-layout row wrap>
                                <v-flex xs12 sm6 md6 lg6 v-for="item in links" :key="item.id">
                                    <v-hover>
                                        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2} rounded-card`">
                                            <v-img
                                                    src=""
                                                    aspect-ratio="2.75"
                                                    height="25px"
                                                    :class="item.color"
                                            ></v-img>

                                            <v-card-title primary-title>
                                                <div>
                                                    <h3 class="headline mb-0">{{item.title}}</h3>
                                                    <div>
                                                        {{item.description}}
                                                    </div>
                                                </div>
                                            </v-card-title>

                                            <v-card-actions>
                                                <v-btn flat color="primary" class="learn-more-btn">
                                                    Learn more
                                                </v-btn>
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary">Get started</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-hover>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                links: [
                    {
                        id: '1',
                        title: 'Data Models',
                        description: 'Get fast and detailed overview on all datasets and tables managed by Jarvis',
                        color: 'orange'
                    },
                    {
                        id: '2',
                        title: 'Data Workflows',
                        description: 'Monitor data workflows executions, check configurations and execute jobs.',
                        color: 'teal'
                    },
                    {
                        id: '3',
                        title: 'Data Quality',
                        description: 'Supervise data quality with simple tSQL queries and maintaining a high quality of information',
                        color: 'blue'
                    },
                    {
                        id: '4',
                        title: 'Data Visualization',
                        description: 'Access to Data Visualizations and Dashboards built on the top of the Data available in Jarvis',
                        color: 'purple'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .outine-2 {
        border: 2px solid white;
    }
    .card--flex-toolbar {
        margin-top: -90px;
    }
    .learn-more-btn {
        text-transform: initial;
        text-decoration: underline;
    }
    .rounded-card{
    border-radius:5px;
    }
</style>
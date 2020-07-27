<template>
<div class="container mx-auto">
  <!-- Input Field -->
  <div class="p-8 flex flex-col items-center justify-center space-y-10">
    <div class="text-sm md:text-xl font-semibold text-center text-gray-600">Insert Your Youtube URL and Specific Keyword</div>
    <div class="bg-white flex w-6/12 items-center rounded-full shadow-xl">
      <input v-model="url" class="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" type="text" placeholder="Youtube URL ...">
    </div>
    <div class="bg-white flex w-6/12 items-center rounded-full shadow-xl">
      <input v-model="keyword" class="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" type="text" placeholder="Specific Keyword ...">
    </div>
    <!-- <div class="p-4">
      <button @click="getVideoData" class="bg-red-500 text-white rounded-full p-2 hover:bg-red-400 focus:outline-none w-12 h-12 flex items-center justify-center">
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </div> -->
    <div v-if="result != null && result.total == 0" class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
      <span class="text-xl inline-block mr-5 align-middle">
        <i class="fa fa-exclamation" />
      </span>
      <span class="inline-block align-middle mr-8">
        Video or Keyword Not Found
      </span>
    </div>
  </div>

  <!-- Loading Spinner -->
  <Spinner v-if="loading" class="mt-16" size="huge" line-fg-color="#FC8181"/>

  <!-- Search Result -->
  <section class="text-gray-700 body-font" v-if="result != null && result.total > 0 && !loading">
    <div class="container px-5 py-24 mx-auto flex flex-col lg:flex-row">
      <div class="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
        <div class="w-full sm:p-4 px-4 mb-6">
          <h1 class="title-font font-medium text-xl mb-2 text-gray-900">Searched Keyword</h1>
          <div class="leading-relaxed">{{ keyword }}</div>
        </div>
        <div class="p-4 w-1/2">
          <h2 class="title-font font-medium text-3xl text-gray-900">{{ result.total }}</h2>
          <p class="leading-relaxed">Matched Search</p>
        </div>
        <!-- <div class="p-4 w-1/2">
          <h2 class="title-font font-medium text-3xl text-gray-900">{{ totalPage }}</h2>
          <p class="leading-relaxed">Total Result Page</p>
        </div> -->
      </div>
      <div class="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
        <iframe width="560" height="315" :src="embed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
    <sequential-entrance delay="500">
      <div class="flex flex-col font-semibold text-gray-100" v-for="(searchResult, index) in result.data" :key="index">
        <div v-if="index%2 == 0" class="w-full p-4 mb-4 bg-red-500 rounded-lg" v-html="searchResult.text"></div>
        <div v-else class="w-full p-4 mb-4 bg-red-400 rounded-lg" v-html="searchResult.text"></div>
      </div>
    </sequential-entrance>
  </section>
</div>
</template>

<script>
import axios from 'axios'
import pDebounce from 'p-debounce'
import { getIdFromUrl } from 'vue-youtube'
import Spinner from 'vue-simple-spinner'

export default {
  name: 'SearchResult',
  data() {
    return {
      url: '',
      keyword: '',
      videoId: '',
      totalPage: '',
      result: null,
      loading: false
    }
  },
  components: {
    Spinner
  },
  watch: {
    keyword: pDebounce(async function handleKeyword() {
      if (this.url && this.keyword.length >=3) {
        await this.getVideoData()
      }
    }, 250)
  },
  computed: {
    embed() {
      return `https://www.youtube.com/embed/${this.videoId}`
    }
  },
  methods: {
    async getVideoData () {
      this.loading = true
      const { data } = await axios.post(`https://cari-teks-video-api.vercel.app/api/search?url=${this.url}&q=${this.keyword}`)

      if (data.total > 0) {
        this.videoId = getIdFromUrl(this.url)
      }

      console.log(data)
      this.result = data
      this.totalPage = data.total%10
      this.loading = false
    }
  }
}
</script>
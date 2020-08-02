<template>
<div class="container mx-auto">
  <div class="text-center mb-20">
    <h1 class="text-3xl font-semibold title-font text-gray-900 mb-4">What Can <span class="text-red-500">Cari Teks Video</span> Do?</h1>
    <p class="text-base capitalize leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Cari Teks Video can search any keyword within your favorite Youtube video.</p>
    <div class="flex mt-6 justify-center">
      <div class="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
    </div>
  </div>
  <!-- Input Field -->
  <div class="p-8 flex flex-col items-center justify-center">
    <div class="bg-white flex w1/2 lg:w-6/12 items-center rounded-full shadow-xl mt-10">
      <input v-model="url" class="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" type="text" placeholder="Youtube URL ...">
    </div>
    <div class="bg-white flex w1/2 lg:w-6/12 items-center rounded-full shadow-xl mt-10">
      <input v-model="keyword" class="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" type="text" placeholder="Specific Keyword ...">
    </div>
    <div v-if="result != null && result.total == 0" class="text-white px-6 py-4 border-0 rounded relative mb-4 mt-10 bg-red-500">
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
  <section v-if="result != null && result.total > 0 && !loading">
    <div class="container px-5 py-24 mx-auto flex flex-col lg:flex-row">
      <div class="flex flex-wrap -mx-4 mt-auto mb-auto w-full sm:w-2/3 content-start sm:pr-10">
        <div class="w-full sm:p-4 px-4 mb-6">
          <h1 class="title-font font-medium text-xl mb-2 text-gray-700">Searched Keyword</h1>
          <div class="text-4xl leading-relaxed text-gray-900 font-semibold">{{ keyword }}</div>
        </div>
        <div class="p-4">
          <h2 class="title-font font-semibold text-3xl text-gray-900">{{ result.total }}</h2>
          <p class="leading-relaxed">Matched Search</p>
        </div>
        <div class="p-4">
          <h2 class="title-font font-semibold text-3xl text-gray-900">{{ totalPage }}</h2>
          <p class="leading-relaxed">Total Result Page</p>
        </div>
      </div>
      <div class="w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
        <iframe width="560" height="315" :src="embed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
    <sequential-entrance delay="500">
      <div class="flex flex-col font-semibold text-gray-100" v-for="(searchResult, index) in result.data" :key="index">
        <div v-if="index%2 == 0" class="w-full p-4 mb-4 bg-red-500 rounded-lg" v-html="searchResult.text"></div>
        <div v-else class="w-full p-4 mb-4 bg-red-400 rounded-lg" v-html="searchResult.text"></div>
      </div>
    </sequential-entrance>
    <div class="flex justify-between items-center">
      <div>
        <button @click="getFirstPage" class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3  rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease">
          <i class="fa fa-angle-double-left"></i>
        </button>
        <button @click="getPrevPage" class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3  rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease">
          <i class="fa fa-angle-left"></i>
        </button>
      </div>
      <div>
        <span class="font-bold">{{ currentPage }} / {{ totalPage }}</span>
      </div>
      <div>
        <button @click="getNextPage" class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3  rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease">
          <i class="fa fa-angle-right"></i>
        </button>
        <button @click="getLastPage" class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3  rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease">
          <i class="fa fa-angle-double-right"></i>
        </button>
      </div>
    </div>
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
      currentPage: 1,
      firstPage: '',
      lastPage: '',
      prevPage: '',
      nextPage: '',
      result: null,
      loading: false
    }
  },
  components: {
    Spinner
  },
  watch: {
    keyword: pDebounce(async function handleKeyword() {
      if(this.url && this.keyword.length >=3) {
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
    async getVideoData() {
      this.loading = true
      const { data } = await axios.post(`https://cari-teks-video-api.vercel.app/api/search?url=${this.url}&q=${this.keyword}`)

      if(data.total > 0) {
        this.videoId = getIdFromUrl(this.url)
      }
      this.result = data
      this.firstPage = data.first
      this.lastPage = data.last
      this.nextPage = data.next
      this.prevPage = data.prev
      this.totalPage = Math.round(data.total/10)
      this.loading = false
      console.log(data)
    },
    async getNextPage() {
      const { data } = await axios.post(this.nextPage)
      this.result = data
      this.nextPage = data.next
      this.prevPage = data.prev
      this.currentPage += 1
    },
    async getPrevPage() {
      const { data } = await axios.post(this.prevPage)
      this.result = data
      this.nextPage = data.next
      this.prevPage = data.prev
      this.currentPage -= 1
    },
    async getFirstPage() {
      const { data } = await axios.post(this.firstPage)
      this.result = data
      this.nextPage = data.next
      this.prevPage = data.prev
      this.currentPage = 1
    },
    async getLastPage() {
      const { data } = await axios.post(this.lastPage)
      this.result = data
      this.nextPage = data.next
      this.prevPage = data.prev
      this.currentPage = this.totalPage
    }
  }
}
</script>
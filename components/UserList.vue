<template>
  <div class="user-list" ref="container">
    <div class="header">
      <div class="row">
        <div class="main-div-content">
          <div class="text main">
            Name
          </div>
        </div>
        <div class="cell">
          <div class="text main">
            Website
          </div>
        </div>
        <div class="cell"  title="sort">
          <div class="text main sortable" @click="setSortQuery('numberOfViews')">
            Number of views
            <i :class="{ 'arrow down': query.sortBy === 'asc', 'arrow up': query.sortBy === 'desc' }"></i>
          </div>
        </div>
      </div>
    </div>

    <div v-if="usersData && usersData.length">
      <RecycleScroller
        class="scroller"
        :item-size="170"
        :min-item-size="170"
        :items="usersData"
        key-field="_id"
        v-slot="{ item }"
        ref="scrollerRef"
        v-bind:pageMode="true"
      >
        <User
          :user="item"
        />
      </RecycleScroller>
    </div>

    <Skeleton v-if="!scrollerRef" />

    <Observer :loadMore="loadMore"/>

    <Loader :isLoading="isLoading" />
    
    <div class="footer">
      
    </div>
    <ScrollToTopButton
      :scroll-to-top="scrollToTop"
      buttonText="Scroll To Top"
    />
  </div>
</template>

<script setup lang="ts">
  const scrollerRef = ref();
  const container = ref();
  
  const query = ref<Query>({
    sortBy: 'asc',
    sortKey: 'firstName',
  });

  const { usersData, fetchNextPage, suspense, isLoading } = useFakeUsersApi(query);

  const setSortQuery = (sortKey: keyof User) => {
    query.value = {
      sortBy: query.value.sortBy === 'asc' ? 'desc' : 'asc',
      sortKey,
    }
  };

  const scrollToTop = () => {
    scrollerRef.value.scrollToPosition()
  }

  const loadMore = () => {
    fetchNextPage();
  }

  await suspense();
</script>

<style>
  .user-list {
    max-width: 900px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
    position: relative;
    padding: 40px 0;
  }

  .scroller {
    height: 100%;
    scroll-behavior: smooth;
    overflow: auto;
    transition: 1s all ease;
    position: relative;
  }

  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 120px;
    
    display: flex;
    justify-content: center;
    align-items: center;

    background-image: -webkit-linear-gradient(-90deg, rgba(255,255,255,0) 0, rgba(255,255,255,1) 100%);
    background-image: -moz-linear-gradient(180deg, rgba(255,255,255,0) 0, rgba(255,255,255,1) 100%);
    background-image: linear-gradient(180deg, rgba(255,255,255,0) 0, rgba(255,255,255,1) 100%);
    background-position: 50% 50%;
    -webkit-background-origin: padding-box;
    background-origin: padding-box;
    -webkit-background-clip: border-box;
    background-clip: border-box;
    -webkit-background-size: auto auto;
    background-size: auto auto;
  }

  .sortable:hover {
    cursor: pointer;
  }

  .header {
    background: #313A4E;
    color: #fff;
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100%;
    max-width: 900px;
  }

  .header .text, .header .text.main {
    color: #fff;
  }

  .arrow {
    border: solid #fff;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    position: absolute;
    top: 3px;
  }

  .arrow:hover {
    cursor: pointer;
  }

  .up {
    top: 8px;
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }

  .down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }


  .header .main-div-content .text.main {
    padding: 0 20px;
  }

  .user {
    font-family: Arial, serif;
    min-height: 120px;
    border-bottom: 1px solid #BBBEC7;
    background: #FFF;
    max-width: 900px;
    margin: 0 auto;
  } 

  .cell {
    width: 250px;
  }

  .main-div-content {
    display: flex;
    align-items: center;
    max-width: 400px;
    min-width: 400px;
  }

  .text {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    white-space: pre-wrap;
    max-width: 150px;
    margin-right: 40px;
  }

  .text.main {
    color: #313A4E;
    font-weight: bold;
    position: relative;
  }

  .row {
    display: flex;
    align-items: center;
    justify-self: center;
    padding: 20px 0;
  }

  .image {
    border-radius: 100%;
    margin: 0 20px;
  }

  .btn-scroll {
    position: fixed;
    bottom: 100px;
    right: 20px;
    width: 200px;
    height: 100px;
    
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 16px;
  }

  @media (max-width: 600px) {
    .user-list {
      padding: 60px 0;
    }
    
    .cell {
      width: 130px;
      align-self: center;
      justify-content: center;
      display: flex;
    }

    .main-div-content {
      flex-direction: column;
      text-align: center;
      justify-content: center;
      align-items: center;
      max-width: 130px;
      min-width: 130px;
    }

    .name-text-holder {
      margin: 10px 0 0 40px;
    }

    .image {
      width: 64px;
      height: 64px;
    }

    .arrow {
      right: 13px;
      top: 17px;
    }

    .text {
      text-align: center;
    }
  }
</style>

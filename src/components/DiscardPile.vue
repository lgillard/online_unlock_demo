<template>
  <b-card class="discard card-size" text-variant="secondary" title="Défausse">
    <b-card-text class="mt-5">
      <b-icon-trash class="trash"/>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: 'DiscardPile',
};
</script>

<style scoped>
.discard
{
  background-color: #f7f7f7;
  border-style:     dashed;
  border-width:     thick;
}

.trash
{
  color:  #c7c8c9;
  height: 120px;
  width:  120px;
}
</style>

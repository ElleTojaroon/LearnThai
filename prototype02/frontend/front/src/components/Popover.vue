<template>
  <div class="l-popover-button">
    <a @click="toggleTooltip"
      class="btn btn-link btn-sm"
      data-toggle="popover"
      data-trigger="click">{{ buttonName }}</a>
    <div class="popover fade bottom invisible" role="tooltip" id="" style="display: block;" :class="{lin: show_tooltip}" :style="{top: tooltip_y, left: tooltip_x}">
      <div class="arrow" :style="{left: tooltip_arrow_left}"></div>
      <h3 class="popover-title" v-html="popoverTitle"></h3>
      <!-- popover-content is not included here for now -->
      <div class="popover-content"><lt-history-row></lt-history-row></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['buttonName', 'popoverTitle', 'popoverContent'],
    data() {
      return {
        show_tooltip: false,
        tooltip_x: '0px',
        tooltip_y: '100px',
        tooltip_arrow_left: '50%'
      }
    },
    methods: {
      toggleTooltip(event){
        var element = event.target;
        var style = window.getComputedStyle(element);
        var width = style.getPropertyValue('width');
        var height = style.getPropertyValue('height');

        width = width.split("px")[0]

        this.tooltip_y = height;
        this.tooltip_arrow_left = width/2 + 'px';

        // console.log('tooltip_x', this.tooltip_x);
        // console.log('tooltip_y', this.tooltip_y);

        this.show_tooltip = !this.show_tooltip;
      }
    }
  }
</script>
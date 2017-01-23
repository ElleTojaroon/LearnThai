<template>
  <div>
    <div class="container" id="lt-container-box">
      <div class="row">
        <div class="col-xs-10">
          <div class="row">
            <div class="col-xs-1">
              <a @click="toggleTooltip"
                id="id_howto"
                class="btn btn-link btn-sm"
                data-toggle="popover"
                data-trigger="click">?</a></div>
                <div class="popover fade bottom invisible" role="tooltip" id="" style="display: block;" :class="{lin: show_tooltip}"
                :style="{top: tooltip_y, left: tooltip_x}">
                  <div class="arrow" style="left: 50%;"></div><h3 class="popover-title"><h1>Notes</h1></h3><div class="popover-content"><lt-navbar>content2</lt-navbar></div>
                </div>
            <div class="col-xs-1">
              <a @click="notes_popover"
                  id="id_notes"
                  class="btn btn-link btn-sm"
                  data-toggle="popover"
                  data-trigger="click">Notes</a></div>
          </div>
        </div>
        <div class="col-xs-2">
          <p><small><a href="#" class="btn btn-link btn-sm">Quit</a></small></p>
        </div>
      </div>

      <h1>Game Level 1</h1>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        show_tooltip: false,
        tooltip_x: '100px',
        tooltip_y: '100px'
      }
    },
    methods: {
      toggleTooltip(event){
        var element = document.getElementById('id_notes');
        var style = window.getComputedStyle(element);
        var width = style.getPropertyValue('width');
        var height = style.getPropertyValue('height');

        console.log('height', height);
        console.log('eventX', event.clientX);

        console.log('width', width);
        console.log('eventY', event.clientY);


        this.tooltip_x = width;
        this.tooltip_y = height;

        console.log('tooltip_x', this.tooltip_x);
        console.log('tooltip_y', this.tooltip_y);

        this.show_tooltip = !this.show_tooltip;
      },
      notes_popover() {
        $('#id_notes').popover(
          {
            title: "<h1>Notes</h1>",
            content: "<lt-navbar>content2</lt-navbar>",
            html: true,
            placement: "bottom"
          });
        console.log('click2');
      }
    }
  }
</script>


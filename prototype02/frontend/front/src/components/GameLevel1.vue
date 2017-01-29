<template>
  <div>
    <div class="container" id="lt-container-box">
      <div class="row">
        <div class="col-xs-11">
          <div class="row" style="padding:1rem;">
            <div class="col-xs-1">
              <a href="#" data-toggle="popover" title="Popover Header" data-content="<lt-history-row></lt-history-row>" html="true" data-placement="bottom">
                <!-- <icon name="book"></icon> -->
              </a>
            </div>
            <div class="col-xs-1">
              <a href="#" data-toggle="popover" title="Popover Header" data-content="Some content inside the popover" data-placement="bottom">
                <!-- <icon name="question-circle"></icon> -->
              </a>
            </div>
          </div>
        </div>
        <div class="col-xs-1">
          <!-- <a href="#" class="btn btn-link btn-sm" data-toggle="modal" data-target="#quitModal"><icon name="close"></icon></a> -->
        </div>
      </div>

      <h1>Game Level 1</h1>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      <button class="btn btn-success btn-md">Click me</button>

    </div>

    <div id="quitModal" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Are you sure you want to quit the game?</h4>
          </div>
          <div class="modal-body">
            <p>No change in this game will be saved after you exit</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Continue playing</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="goHome">Exit</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
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

        this.tooltip_y = height;
        this.tooltip_arrow_left = width;

        // console.log('tooltip_x', this.tooltip_x);
        // console.log('tooltip_y', this.tooltip_y);

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
      },
      goHome() {
        return this.$router.push('/')
      }
    }
  }

  $(document).ready(function(){
    $('[data-toggle="popover"]').popover();

    $('.btn')
      .popover({trigger: 'manual'})
      .popover({title: "<h1><strong>HTML</strong> inside <code>the</code> <em>popover</em></h1>", content: "Blabla <br> <h2>Cool stuff!</h2>", html: true, placement: "right"});
  });
</script>


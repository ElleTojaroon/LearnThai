<template>
  <div>
    <div class="container" id="lt-container-box">
      <div class="row lt-topbar">
        <div class="col-xs-11 lt-topbar">
          <div class="row lt-topbar lt-no-padding" style="padding:1rem;">
            <div class="col-xs-1">
              <el-popover
                ref="popover-note"
                placement="bottom"
                title="Memory refresher"
                width="500"
                trigger="click">
                <lt-history-row></lt-history-row>
              </el-popover>

              <el-button type="text" v-popover:popover-note><i class="fa fa-book"></i></el-button>
            </div>
            <div class="col-xs-1">
              <el-button type="text"><i class="fa fa-question-circle"></i></el-button>
            </div>
          </div>
        </div>
        <div class="col-xs-1 lt-topbar">
          <el-button type="text" @click="dialogVisible = true"><i class="fa fa-close"></i></el-button>
        </div>
      </div>

      <!-- game content -->
      <!-- default is lt-game-level1 but the component is sent from Game's attribute is -->
      <slot :levelAdvanced="incrLevel"><lt-game-level1 :levelAdvanced="incrLevel"></lt-game-level1></slot>
    </div>

    <el-dialog title="Are you sure you want to exit the game?" v-model="dialogVisible" size="tiny">
      <span>No change will be saved after you exit</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="exit">Exit</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        currGameLevel: 1
      }
    },
    methods: {
      exit() {
        this.dialogVisible = false
        return this.$router.push('/')
      },
      incrLevel: function() {
        this.currGameLevel += 1;
        // this.$emit('incrLevel');
        console.log('incrLevel');
      }
    }
  }
</script>

<style scoped>
  .lt-topbar {
    height: 25px !important;
  }

  .lt-no-padding {
    padding: 0 !important;
  }
</style>


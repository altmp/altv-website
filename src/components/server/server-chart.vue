<script>
import { Line } from "vue-chartjs";

export default {
    extends: Line,
    props: ['data'],
    data: function() {
        return {
            gradient2: null
        }
    },
    mounted() {
        this.gradient2 = this.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 450);

        this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
        this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
        this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");

        // this.renderChart(this.data);
    },
    watch: { 
        data: function(newVal, oldVal) { // watch it
            console.log('Prop changed: ', newVal, ' | was: ', oldVal);
        }
    }
}
</script>
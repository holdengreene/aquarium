<script>
  export let name;
  export let size = 20;
</script>

<style>
  .icon {
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    object-fit: contain;
    transform-origin: center center;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    transition: stroke 0.3s ease;
  }
</style>

<svg class="icon" width={size} height={size}>
  <use xlink:href="#{name}" />
</svg>

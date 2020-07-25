<script>
  import { createEventDispatcher } from "svelte";

  export let open = false;

  const dispatch = createEventDispatcher();

  function closePopup() {
    dispatch("close");
  }
</script>

<style>
  .popup-overlay {
    display: none;
    background-color: rgba(165, 140, 140, 0.3);
    z-index: 10;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
  }

  .open {
    display: flex;
  }

  .popup {
    background-color: #fff;
    min-height: 400px;
    width: 60%;
    box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.12),
      0 0.0625rem 0.125rem rgba(15, 14, 14, 0.24);
    border-radius: 3px;
  }

  .close-btn {
    position: absolute;
    right: 30px;
    top: 10px;
    font-size: 50px;
    background: none;
    border: none;
    cursor: pointer;
  }
</style>

<div class="popup-overlay" class:open>
  <button type="button" class="close-btn" on:click={closePopup}>X</button>
  <div class="popup">
    <slot />
  </div>
</div>

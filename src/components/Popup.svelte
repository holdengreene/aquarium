<script>
  import { popup } from "../lib/store";
  import { fade } from "svelte/transition";

  import Icon from "../components/Icon.svelte";
  import Icons from "../components/Icons.svelte";

  export function closePopup() {
    popup.close();
  }
</script>

<style>
  .popup-overlay {
    display: flex;
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

  .popup {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: var(--card-background);
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

{#if $popup}
  <Icons />

  <div class="popup-overlay" transition:fade={{ duration: 250 }}>
    <button type="button" class="close-btn" on:click={closePopup}>
      <Icon name="close" size="62" />
    </button>
    <div class="popup">
      <slot />
    </div>
  </div>
{/if}

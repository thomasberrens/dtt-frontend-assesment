<script setup>
import DTTLogo from "../assets/img_logo_dtt@3x.png"
</script>

<template>
  <div class="h-full w-full">

    <div class="main-container">
      <div class="content-container">
        <h1 style="margin-top: 1rem;" class="hide-on-desktop flex justify-center">About</h1>
        <div style="margin-top: 2rem; margin-bottom: .5rem;" class="fle">
          <h2>About DTT Real Estate</h2>
          <p class="font-open-sans-semibold">
          Hallo, ik ben Thomas Berrens 21 jaar oud en kom uit Krommenie. Ik programmeer ondertussen een paar jaar, voornamelijk was ik bezig met game development maar uiteindelijk zag ik mijn passie meer terug in frontend & backend. Wel vind ik het nog leuk om webgames te maken d.m.v ThreeJS.
          </p>

          <footer>
            <h2>Design and Development</h2>

            <div class="flex-container">
              <img alt="DTT Logo" :src="DTTLogo">
              <div class="text-container">
                <div class="font-open-sans-semibold">By DTT</div>
                <a class="font-open-sans-semibold text-hyperlink" href="http://www.d-tt.nl">www.d-tt.nl</a>
              </div>
            </div>

          </footer>
        </div>
      </div>
    </div>

  </div>
</template>



<style scoped>
.flex-container {
  display: flex;
  align-items: flex-end;
}

.text-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 1.5rem;
  margin-bottom: 2rem;
}

footer {
  margin-top: 2rem;
}

footer img {
  width: 15rem;
  height: 8rem;
  object-fit: contain;
}


@media (max-width: 1023px) {
  .content-container {
    width: 90%;
    margin-left: 1rem;
    margin-right: 1rem;
  }

}


@media (min-width: 1024px) {
  .content-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
  }

}

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>

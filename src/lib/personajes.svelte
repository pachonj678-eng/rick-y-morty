<script>
  import { onMount } from 'svelte';

  let personajes = [];
  let cargando = true;

  onMount(async () => {
    try {
      const res = await fetch('https://rickandmortyapi.com/api/character');
      const data = await res.json();
      personajes = data.results;
    } catch (error) {
      console.error("Error al consumir la API:", error);
    } finally {
      cargando = false;
    }
  });
</script>

<div class="container">
  <h1>Personajes de Rick and Morty</h1>

  {#if cargando}
    <p class="loading">Cargando personajes...</p>
  {:else}
    <div class="grid">
      {#each personajes as personaje}
        <div class="card">
          <img src={personaje.image} alt={personaje.name} />
          <div class="info">
            <h3>{personaje.name}</h3>
            <p><strong>Estado:</strong> <span class={personaje.status.toLowerCase()}>{personaje.status}</span></p>
            <p><strong>Especie:</strong> {personaje.species}</p>
            <p><strong>Origen:</strong> {personaje.origin.name}</p>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }
  h1 {
    text-align: center;
    color: #222;
    margin-bottom: 30px;
  }
  .loading {
    text-align: center;
    font-size: 20px;
    color: #666;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  .card {
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transition: transform 0.2s;
  }
  .card:hover {
    transform: translateY(-5px);
  }
  .card img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
  .info {
    padding: 15px;
  }
  .info h3 {
    margin: 0 0 10px 0;
    color: #00b5cc;
  }
  .info p {
    margin: 5px 0;
    font-size: 14px;
    color: #444;
  }
  .alive { color: #28a745; font-weight: bold; }
  .dead { color: #dc3545; font-weight: bold; }
  .unknown { color: #ffc107; font-weight: bold; }
</style>
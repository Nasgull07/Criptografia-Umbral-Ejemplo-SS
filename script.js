let partes = [];

function dividirSecreto() {
  const secret = document.getElementById("secretInput").value;
  const n = parseInt(document.getElementById("nInput").value);
  const t = parseInt(document.getElementById("tInput").value);

  if (!secret || t > n) {
    alert("¡Error! Asegúrate de que t ≤ n y que el secreto no esté vacío.");
    return;
  }

  partes = secrets.share(secrets.str2hex(secret), n, t);
  mostrarPartes(partes);
}

function mostrarPartes(shares) {
  const container = document.getElementById("sharesContainer");
  const reconContainer = document.getElementById("reconstructContainer");
  container.innerHTML = "<h2> Partes generadas:</h2>";
  reconContainer.innerHTML = "";

  shares.forEach((parte, index) => {
    container.innerHTML += `<p>Parte ${index + 1}: ${parte}</p>`;
    reconContainer.innerHTML += `
      <label>
        <input type="checkbox" value="${parte}" />
        Parte ${index + 1}
      </label><br />
    `;
  });
}

function reconstruirSecreto() {
  const checkboxes = document.querySelectorAll(
    "#reconstructContainer input[type='checkbox']:checked"
  );
  const seleccionadas = Array.from(checkboxes).map((cb) => cb.value);

  try {
    const secretoRec = secrets.hex2str(secrets.combine(seleccionadas));
    document.getElementById("resultado").innerText =
      "Secreto reconstruido: " + secretoRec;
  } catch (e) {
    document.getElementById("resultado").innerText =
      "No se pudo reconstruir. ¿Seleccionaste al menos t partes?";
  }
}

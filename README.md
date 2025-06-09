⚙️ ¿Qué hace exactamente la librería?

Cuando haces esto:



let shares = secrets.share(hexSecret, n, t);

La librería sigue estos pasos (de forma interna):

Paso 1: Convertir el secreto a un número
Ya sea una cadena o número, lo convierte a una cadena hexadecimal → que representa un número en base 16.

Paso 2: Elegir un campo finito (GF)
Elige un campo finito de tamaño suficientemente grande, usando un número primo predefinido (por defecto, un primo de 1024 bits).

Esto es necesario para operar con polinomios en aritmética modular.

Paso 3: Construir un polinomio de grado t−1
Por ejemplo, si t = 3, genera un polinomio aleatorio:

f(x) = a₀ + a₁·x + a₂·x² mod p

donde:

a₀ = secreto

a₁, a₂ = números aleatorios generados por la librería

p = primo grande (campo finito)

Paso 4: Evaluar el polinomio en n puntos
Calcula f(1), f(2), ..., f(n), y genera las partes como pares (x, y) → codificados como strings.

Por ejemplo, una parte puede verse así:


801b7-08c2ae...
Donde:

801b7 representa x

08c2ae... representa y (evaluación del polinomio en x)

Paso 5: Para reconstruir el secreto
Cuando haces:


secrets.combine(subsetOfShares)
la librería:

Decodifica los pares (x, y)

Usa interpolación de Lagrange para evaluar el polinomio en x = 0 (que corresponde a a₀, el secreto original)

Esto se hace en aritmética modular sobre el mismo campo finito.


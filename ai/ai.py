from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json

    print("🔥 CARRITO RECIBIDO:", data)

    cart = data.get('cart', [])

    recommendations = []

    # 🔥 LÓGICA DE RECOMENDACIÓN
    for item in cart:
        name = item.get('name', '').lower()

        if name == 'solomillo':
            recommendations.append('🍷 Vino tinto')
        elif name == 'entrecot':
            recommendations.append('🧂 Pimienta premium')
        elif name == 'chuletas':
            recommendations.append('🔥 Salsa barbacoa')

    # 👇 SI NO HAY NADA, DAR RECOMENDACIÓN GENERAL
    if not recommendations:
        recommendations.append('🥩 Te recomendamos probar nuestros productos estrella')

    return jsonify({"recommendations": recommendations})

if __name__ == '__main__':
    app.run(port=5001)
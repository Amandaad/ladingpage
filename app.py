from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # permite conexão com o HTML

ARQUIVO = "agendamentos.json"

# rota para salvar agendamento
@app.route("/agendar", methods=["POST"])
def agendar():
    dados = request.json

    try:
        with open(ARQUIVO, "r", encoding="utf-8") as f:
            agendamentos = json.load(f)
    except FileNotFoundError:
        agendamentos = []

    agendamentos.append(dados)

    with open(ARQUIVO, "w", encoding="utf-8") as f:
        json.dump(agendamentos, f, ensure_ascii=False, indent=4)

    return jsonify({"mensagem": "Agendamento salvo com sucesso!"})

if __name__ == "__main__":
    app.run(debug=True)
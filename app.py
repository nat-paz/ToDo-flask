from flask import Flask, jsonify, request
import pandas as pd

app = Flask(__name__)

try:
    open('Text.csv', 'x')
    with open("Text.csv", "w") as arquivo:
         arquivo.write("ID,TAREFA\n") 
except:
    pass

@app.route("/list", methods=['GET'])
def listarTarefas():    
    tarefas = pd.read_csv('Text.csv')
    tarefas = tarefas.to_dict('records')    
    return jsonify(tarefas)

@app.route("/add", methods=['POST'])
def addTarefas():
    item = request.json  
    tarefas = pd.read_csv('Text.csv')
    tarefas = tarefas.to_dict('records') 
    id = len(tarefas) + 1
    with open("Text.csv", "a") as arquivo:
        arquivo.write(f"{id},{item['Tarefa']}\n")    

    tarefas = pd.read_csv('Text.csv')
    tarefas = tarefas.to_dict('records')        
    return jsonify(tarefas)

@app.route('/update/<string:tarefa_antiga>/<string:tarefa_nova>', methods=['PUT'])
def update_user(tarefa_antiga, tarefa_nova):
    item = request.json
    tarefas = pd.read_csv('Text.csv')
    tarefas = tarefas.to_dict('records') 

    for dicionario in tarefas:
        if dicionario["Tarefa"] == tarefa_antiga:
            dicionario["Tarefa"] = tarefa_nova
            return "Tarefa alterada"
    return "Tarefa não encontrada"


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
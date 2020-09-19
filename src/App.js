/* src/App.js */
import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { listChoices } from './graphql/queries'
import { createChoice } from './graphql/mutations'
import awsExports from './aws-exports'

Amplify.configure(awsExports);

const initialState = { name: '', description: '', animal: 'cat'}

const App = () => {

  const [formState, setFormState] = useState(initialState)
  const [choices, setchoices] = useState([])

  useEffect(() => {
    fetchchoices()
  }, [])

  async function fetchchoices() {
    try {
      const choiceData = await API.graphql(graphqlOperation(listChoices, {
        limit: 20
      },
      ))
      const choices = choiceData.data.listChoices.items
      setchoices(choices)
    } catch (err) { console.log(err) }
  }

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function addchoice() {
    try {
      if (!formState.name || !formState.description ||!formState.animal) return
      const choice = { ...formState }
      setchoices([...choices, choice])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createChoice, {input: choice}))
    } catch (err) {
      console.log('error creating choice:', err)
    }
  }


  return (
    <div style={styles.container}>

    <h1>Liste des 20 derniers choix</h1>
    <table style={styles.table_td_th}>
      <thead>
        <tr style={styles.table_td_th, styles.th}>
          <th style={styles.table_td_th}>Nom</th>
          <th style={styles.table_td_th}>Animal</th>
          <th style={styles.table_td_th}>Description</th>
        </tr>
      </thead>
      {
        choices.map((choice) => (
          <tbody style={styles.table_td_th} >
            {
              <tr key={choice.id} style={styles.table_td_th} >
                <td style={styles.table_td_th}>{choice.name}</td>
                <td style={styles.table_td_th}>{choice.animal}</td>
                <td style={styles.table_td_th}>{choice.description}</td>
              </tr>
            }
          </tbody>
        ))
      }
    </table>
    <h2>Sélectionnez votre animal préféré</h2>
    <input
      onChange={event => setInput('name', event.target.value)}
      style={styles.input}
      value={formState.name} 
      placeholder="Name"
      required
    />
    <input
      onChange={event => setInput('description', event.target.value)}
      style={styles.input}
      value={formState.description}
      placeholder="Description"
    />
    <select 
      onChange={event => setInput('animal', event.target.value)}
      style={styles.input}
      value={formState.animal}
      placeholder="Animal"
    >
    <option value="cat" defaultValue>Cat</option>
    <option value="dog">Dog</option>
    <option value="pet">Pet</option>
    </select>

    <button style={styles.button} onClick={addchoice}>Create choice</button>
  </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 20 },
  choice: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  choiceName: { fontSize: 20, fontWeight: 'bold' },
  choiceDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' },
  table_td_th: { width: '20%', border: '1px solid green', textalign: 'center'},
  th: { backgroundcolor: 'green', color: 'black'},
  image_cat: { float: 'left', width: "100", height: "50"},
  image_dog: { float: 'rigth', width: "100", height: "50"}
  }


export default App;

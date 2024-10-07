import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

const EvaluationForm = () => {
  const route = useRoute();
  const { productId } = route.params as { productId: number };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [experience, setExperience] = useState('Feliz');
  const [recommend, setRecommend] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!name || !email || !feedback || !experience) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const evaluation = {
      id: String(Date.now()), // Gera um ID temporário
      productId: productId,
      name: name,
      email: email,
      feedback: feedback,
      experience: experience,
      recommend: recommend,
    };

    setLoading(true); // Inicia o loading

    // Adiciona um delay de 3 segundos
    setTimeout(() => {
      fetch('http://192.168.100.203:3000/evaluations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(evaluation),
      })
        .then(response => response.json())
        .then(data => {
          setLoading(false); // Finaliza o loading
          Alert.alert('Sucesso', 'Avaliação enviada com sucesso.');
        })
        .catch(error => {
          setLoading(false); // Finaliza o loading em caso de erro
          Alert.alert('Erro', 'Erro ao enviar a avaliação. Tente novamente.');
        });
    }, 3000);
  };

  const getButtonStyle = (option: string) => {
    if (option === 'Feliz') return styles.happyButton;
    if (option === 'Boa') return styles.goodButton;
    if (option === 'Médio') return styles.mediumButton;
    if (option === 'Ruim') return styles.badButton;
    return styles.experienceButton;
  };

  const renderExperienceButton = (option: string) => (
    <TouchableOpacity
      style={[
        styles.experienceButton,
        getButtonStyle(option), // Aplica cor baseado na opção
        experience === option && styles.selectedButton,
      ]}
      onPress={() => setExperience(option)}
    >
      <Text
        style={[
          styles.experienceButtonText,
          experience === option && styles.selectedButtonText,
        ]}
      >
        {option}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avaliação do Produto ID: {productId}</Text>

      <TextInput
        style={styles.input}
        placeholder="Seu Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Seu Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Seu Feedback"
        multiline
        value={feedback}
        onChangeText={setFeedback}
      />

      <Text style={styles.label}>Qual foi sua experiência?</Text>
      <View style={styles.experienceContainer}>
        {renderExperienceButton('Feliz')}
        {renderExperienceButton('Boa')}
        {renderExperienceButton('Médio')}
        {renderExperienceButton('Ruim')}
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Você recomenda?</Text>
        <Switch value={recommend} onValueChange={setRecommend} />
      </View>

      <Button
        title={loading ? 'Enviando...' : 'Enviar Feedback'}
        onPress={handleSubmit}
        disabled={loading} // Desabilita o botão enquanto carrega
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  experienceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  experienceButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
  },
  happyButton: {
    backgroundColor: '#006400', // Verde escuro
  },
  goodButton: {
    backgroundColor: '#90ee90', // Verde claro
  },
  mediumButton: {
    backgroundColor: '#ffa500', // Laranja
  },
  badButton: {
    backgroundColor: '#ff4500', // Vermelho
  },
  selectedButton: {
    borderColor: '#000', 
    borderWidth: 2,
  },
  experienceButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  selectedButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default EvaluationForm;

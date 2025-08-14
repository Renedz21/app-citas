import React, { Fragment, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  FadeIn,
  SlideInRight,
  BounceIn,
  ZoomIn
} from 'react-native-reanimated';

type UserType = 'professional' | 'client' | null;
type OnboardingStep =
  | 'user-type'
  | 'professional-info'
  | 'client-info'
  | 'complete';

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('user-type');
  const [userType, setUserType] = useState<UserType>(null);

  // Animation values
  const progressWidth = useSharedValue(33.33); // Start at step 1 (33.33%)
  const contentOpacity = useSharedValue(1);
  const contentTranslateX = useSharedValue(0);
  const celebrationScale = useSharedValue(0);

  // Professional form data
  const [professionalData, setProfessionalData] = useState({
    specialty: '',
    licenseNumber: '',
    yearsExperience: '',
    clinicName: '',
    clinicAddress: '',
    consultationFee: ''
  });

  // Client form data
  const [clientData, setClientData] = useState({
    age: '',
    gender: '',
    interests: '',
    preferences: '',
    emergencyContact: '',
    preferredLanguage: ''
  });

  const specialties = [
    // Salud y Bienestar
    'Medicina General',
    'Psicología',
    'Fisioterapia',
    'Nutrición',
    'Odontología',
    // Belleza y Estética
    'Peluquería',
    'Barbería',
    'Estética Facial',
    'Manicure/Pedicure',
    'Masajes',
    // Tecnología
    'Desarrollo Web',
    'Diseño Gráfico',
    'Consultoría IT',
    'Reparación Técnica',
    // Servicios a Domicilio
    'Limpieza',
    'Jardinería',
    'Plomería',
    'Electricidad',
    'Carpintería',
    // Educación y Coaching
    'Clases Particulares',
    'Coaching Personal',
    'Entrenamiento Físico',
    // Otros
    'Fotografía',
    'Consultoría',
    'Otro'
  ];

  const experienceRanges = [
    '1-2 años',
    '3-5 años',
    '6-10 años',
    '11-15 años',
    '16-20 años',
    'Más de 20 años'
  ];

  const genderOptions = [
    'Masculino',
    'Femenino',
    'No binario',
    'Prefiero no decir'
  ];

  const languages = ['Español', 'Inglés', 'Francés', 'Portugués', 'Otro'];

  const animateStepTransition = (newStep: OnboardingStep) => {
    // Slide out current content
    contentOpacity.value = withTiming(0, { duration: 200 });
    contentTranslateX.value = withTiming(-50, { duration: 200 });

    // Update progress bar
    const stepProgress =
      newStep === 'user-type'
        ? 33.33
        : newStep === 'professional-info' || newStep === 'client-info'
          ? 66.66
          : 100;
    progressWidth.value = withSpring(stepProgress, {
      damping: 15,
      stiffness: 100
    });

    // After slide out, change step and slide in
    setTimeout(() => {
      setCurrentStep(newStep);
      contentTranslateX.value = 50;
      contentOpacity.value = withTiming(1, { duration: 300 });
      contentTranslateX.value = withSpring(0, {
        damping: 20,
        stiffness: 100
      });
    }, 200);
  };

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    if (type === 'professional') {
      animateStepTransition('professional-info');
    } else if (type === 'client') {
      animateStepTransition('client-info');
    }
  };

  const handleComplete = () => {
    animateStepTransition('complete');
    // Start celebration animation after step transition
    setTimeout(() => {
      celebrationScale.value = withSequence(
        withSpring(1.2, { damping: 8, stiffness: 100 }),
        withSpring(1, { damping: 12, stiffness: 100 })
      );
    }, 300);
  };

  const handleBack = () => {
    animateStepTransition('user-type');
  };

  const renderUserTypeSelection = () => (
    <View className="flex-1 px-6 py-8">
      <Animated.View
        entering={FadeIn.delay(200)}
        className="items-center mb-12"
      >
        <Animated.View
          entering={BounceIn.delay(400)}
          className="w-20 h-20 bg-indigo-100 rounded-full items-center justify-center mb-6"
        >
          <Feather name="users" size={32} color="#4F46E5" />
        </Animated.View>
        <Animated.Text
          entering={FadeIn.delay(600)}
          className="text-slate-900 text-3xl font-bold text-center mb-3"
        >
          ¡Bienvenido!
        </Animated.Text>
        <Animated.Text
          entering={FadeIn.delay(800)}
          className="text-slate-600 text-center text-lg leading-6 max-w-sm"
        >
          Para personalizar tu experiencia, necesitamos conocer un poco más
          sobre ti
        </Animated.Text>
      </Animated.View>

      <View className="gap-y-4 mb-8">
        <Animated.View entering={SlideInRight.delay(1000).springify()}>
          <TouchableOpacity
            className="bg-white rounded-xl border-2 border-slate-200 p-6"
            onPress={() => handleUserTypeSelect('professional')}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center">
              <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mr-4">
                <Feather name="briefcase" size={24} color="#3B82F6" />
              </View>
              <View className="flex-1">
                <Text className="text-slate-900 font-bold text-lg mb-1">
                  Soy un Profesional Independiente
                </Text>
                <Text className="text-slate-600 text-sm">
                  Ofrezco servicios profesionales en mi área de especialidad
                </Text>
              </View>
              <Feather name="chevron-right" size={24} color="#94A3B8" />
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={SlideInRight.delay(1200).springify()}>
          <TouchableOpacity
            className="bg-white rounded-xl border-2 border-slate-200 p-6"
            onPress={() => handleUserTypeSelect('client')}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center">
              <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mr-4">
                <Feather name="user" size={24} color="#10B981" />
              </View>
              <View className="flex-1">
                <Text className="text-slate-900 font-bold text-lg mb-1">
                  Soy un Cliente
                </Text>
                <Text className="text-slate-600 text-sm">
                  Busco servicios profesionales y quiero agendar citas
                </Text>
              </View>
              <Feather name="chevron-right" size={24} color="#94A3B8" />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Animated.Text
        entering={FadeIn.delay(1400)}
        className="text-slate-500 text-sm text-center"
      >
        Puedes cambiar esta configuración más tarde en tu perfil
      </Animated.Text>
    </View>
  );

  const renderProfessionalInfo = () => (
    <ScrollView
      className="flex-1 px-6 py-8"
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeIn.delay(100)} className="items-center mb-8">
        <Animated.View
          entering={ZoomIn.delay(300)}
          className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4"
        >
          <Feather name="briefcase" size={24} color="#3B82F6" />
        </Animated.View>
        <Animated.Text
          entering={FadeIn.delay(500)}
          className="text-slate-900 text-2xl font-bold text-center mb-2"
        >
          Información Profesional
        </Animated.Text>
        <Animated.Text
          entering={FadeIn.delay(700)}
          className="text-slate-600 text-center"
        >
          Completa tu perfil profesional para ofrecer mejor atención
        </Animated.Text>
      </Animated.View>

      <Animated.View entering={FadeIn.delay(900)} className="gap-y-6">
        {/* Specialty */}
        <Animated.View entering={SlideInRight.delay(1100).springify()}>
          <Text className="text-slate-700 font-medium mb-3">
            Área de Especialidad *
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {specialties.map((specialty, index) => (
              <Animated.View
                key={specialty}
                entering={FadeIn.delay(1300 + index * 50)}
              >
                <TouchableOpacity
                  className={`px-4 py-2 rounded-full border ${
                    professionalData.specialty === specialty
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'bg-white border-slate-300'
                  }`}
                  onPress={() =>
                    setProfessionalData({ ...professionalData, specialty })
                  }
                >
                  <Text
                    className={`text-sm font-medium ${
                      professionalData.specialty === specialty
                        ? 'text-blue-700'
                        : 'text-slate-700'
                    }`}
                  >
                    {specialty}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* License Number */}
        <Animated.View entering={SlideInRight.delay(1600).springify()}>
          <Text className="text-slate-700 font-medium mb-2">
            Número de Licencia/Certificación
          </Text>
          <TextInput
            className="bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900"
            placeholder="Ej: 12345 (si aplica)"
            value={professionalData.licenseNumber}
            onChangeText={(text) =>
              setProfessionalData({ ...professionalData, licenseNumber: text })
            }
          />
        </Animated.View>

        {/* Years of Experience */}
        <View>
          <Text className="text-slate-700 font-medium mb-3">
            Años de Experiencia *
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {experienceRanges.map((range) => (
              <TouchableOpacity
                key={range}
                className={`px-4 py-2 rounded-full border ${
                  professionalData.yearsExperience === range
                    ? 'bg-blue-100 border-blue-500'
                    : 'bg-white border-slate-300'
                }`}
                onPress={() =>
                  setProfessionalData({
                    ...professionalData,
                    yearsExperience: range
                  })
                }
              >
                <Text
                  className={`text-sm font-medium ${
                    professionalData.yearsExperience === range
                      ? 'text-blue-700'
                      : 'text-slate-700'
                  }`}
                >
                  {range}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Business Name */}
        <View>
          <Text className="text-slate-700 font-medium mb-2">
            Nombre del Negocio/Marca Personal
          </Text>
          <TextInput
            className="bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900"
            placeholder="Ej: Estudio Creativo, Salón Bella, etc."
            value={professionalData.clinicName}
            onChangeText={(text) =>
              setProfessionalData({ ...professionalData, clinicName: text })
            }
          />
        </View>

        {/* Business Address */}
        <View>
          <Text className="text-slate-700 font-medium mb-2">
            Dirección de Trabajo
          </Text>
          <TextInput
            className="bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900"
            placeholder="Calle, Ciudad, País (o 'A domicilio' si aplica)"
            value={professionalData.clinicAddress}
            onChangeText={(text) =>
              setProfessionalData({ ...professionalData, clinicAddress: text })
            }
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Service Fee */}
        <View>
          <Text className="text-slate-700 font-medium mb-2">
            Tarifa por Servicio (USD)
          </Text>
          <TextInput
            className="bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900"
            placeholder="Ej: 50 (precio base)"
            value={professionalData.consultationFee}
            onChangeText={(text) =>
              setProfessionalData({
                ...professionalData,
                consultationFee: text
              })
            }
            keyboardType="numeric"
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeIn.delay(2000)}>
        <TouchableOpacity
          className="bg-indigo-600 py-4 rounded-xl mt-8 mb-4"
          onPress={handleComplete}
          activeOpacity={0.8}
        >
          <Text className="text-center text-white font-bold text-lg">
            Completar Perfil Profesional
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="py-3" onPress={handleBack}>
          <Text className="text-center text-slate-600 font-medium">Volver</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );

  const renderClientInfo = () => (
    <ScrollView
      className="flex-1 px-6 py-8"
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeIn.delay(100)} className="items-center mb-8">
        <Animated.View
          entering={ZoomIn.delay(300)}
          className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-4"
        >
          <Feather name="user" size={24} color="#10B981" />
        </Animated.View>
        <Animated.Text
          entering={FadeIn.delay(500)}
          className="text-slate-900 text-2xl font-bold text-center mb-2"
        >
          Información del Cliente
        </Animated.Text>
        <Animated.Text
          entering={FadeIn.delay(700)}
          className="text-slate-600 text-center"
        >
          Ayúdanos a brindarte la mejor experiencia personalizada
        </Animated.Text>
      </Animated.View>

      <View className="gap-y-6">
        {/* Age */}
        <View>
          <Text className="text-slate-700 font-medium mb-2">Edad *</Text>
          <TextInput
            className="bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900"
            placeholder="Ej: 25"
            value={clientData.age}
            onChangeText={(text) => setClientData({ ...clientData, age: text })}
            keyboardType="numeric"
          />
        </View>

        {/* Gender */}
        <View>
          <Text className="text-slate-700 font-medium mb-3">Género *</Text>
          <View className="flex-row flex-wrap gap-2">
            {genderOptions.map((gender) => (
              <TouchableOpacity
                key={gender}
                className={`px-4 py-2 rounded-full border ${
                  clientData.gender === gender
                    ? 'bg-green-100 border-green-500'
                    : 'bg-white border-slate-300'
                }`}
                onPress={() => setClientData({ ...clientData, gender })}
              >
                <Text
                  className={`text-sm font-medium ${
                    clientData.gender === gender
                      ? 'text-green-700'
                      : 'text-slate-700'
                  }`}
                >
                  {gender}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Interests */}
        <View>
          <Text className="text-slate-700 font-medium mb-2">
            Intereses y Servicios que Buscas
          </Text>
          <TextInput
            className="bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900"
            placeholder="Ej: Corte de cabello, masajes, clases de inglés, etc."
            value={clientData.interests}
            onChangeText={(text) =>
              setClientData({ ...clientData, interests: text })
            }
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Preferences */}
        <View>
          <Text className="text-slate-700 font-medium mb-2">
            Preferencias Especiales
          </Text>
          <TextInput
            className="bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900"
            placeholder="Horarios preferidos, ubicaciones, requisitos especiales..."
            value={clientData.preferences}
            onChangeText={(text) =>
              setClientData({ ...clientData, preferences: text })
            }
          />
        </View>

        {/* Emergency Contact */}
        <View>
          <Text className="text-slate-700 font-medium mb-2">
            Contacto de Emergencia *
          </Text>
          <TextInput
            className="bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900"
            placeholder="Nombre y teléfono"
            value={clientData.emergencyContact}
            onChangeText={(text) =>
              setClientData({ ...clientData, emergencyContact: text })
            }
          />
        </View>

        {/* Preferred Language */}
        <View>
          <Text className="text-slate-700 font-medium mb-3">
            Idioma Preferido para Servicios
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {languages.map((language) => (
              <TouchableOpacity
                key={language}
                className={`px-4 py-2 rounded-full border ${
                  clientData.preferredLanguage === language
                    ? 'bg-green-100 border-green-500'
                    : 'bg-white border-slate-300'
                }`}
                onPress={() =>
                  setClientData({
                    ...clientData,
                    preferredLanguage: language
                  })
                }
              >
                <Text
                  className={`text-sm font-medium ${
                    clientData.preferredLanguage === language
                      ? 'text-green-700'
                      : 'text-slate-700'
                  }`}
                >
                  {language}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <Animated.View entering={FadeIn.delay(1500)}>
        <TouchableOpacity
          className="bg-indigo-600 py-4 rounded-xl mt-8 mb-4"
          onPress={handleComplete}
          activeOpacity={0.8}
        >
          <Text className="text-center text-white font-bold text-lg">
            Completar Perfil de Cliente
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="py-3" onPress={handleBack}>
          <Text className="text-center text-slate-600 font-medium">Volver</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );

  // Animated styles
  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
      transform: [{ translateX: contentTranslateX.value }]
    };
  });

  const celebrationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: celebrationScale.value }]
    };
  });

  const renderComplete = () => (
    <View className="flex-1 justify-center items-center px-6">
      <Animated.View className="items-center max-w-sm">
        <Animated.View
          style={celebrationStyle}
          className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-6"
        >
          <Feather name="check-circle" size={32} color="#10B981" />
        </Animated.View>
        <Animated.Text
          entering={FadeIn.delay(200)}
          className="text-slate-900 text-3xl font-bold text-center mb-3"
        >
          ¡Perfil Completado!
        </Animated.Text>
        <Animated.Text
          entering={FadeIn.delay(400)}
          className="text-slate-600 text-center text-lg leading-6 mb-8"
        >
          {userType === 'professional'
            ? 'Tu perfil profesional está listo. Ahora puedes comenzar a gestionar tus servicios y citas.'
            : 'Tu perfil de cliente está listo. Ahora puedes buscar profesionales y agendar servicios.'}
        </Animated.Text>

        <Animated.View
          entering={SlideInRight.delay(600).springify()}
          className="w-full"
        >
          <TouchableOpacity
            className="bg-indigo-600 py-4 px-8 rounded-xl"
            onPress={() => router.replace('/(tabs)')}
            activeOpacity={0.8}
          >
            <Text className="text-center text-white font-bold text-lg">
              Comenzar
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );

  const getStepProgress = () => {
    switch (currentStep) {
      case 'user-type':
        return 1;
      case 'professional-info':
      case 'client-info':
        return 2;
      case 'complete':
        return 3;
      default:
        return 1;
    }
  };

  // Animated progress bar style
  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`
    };
  });

  return (
    <Fragment>
      <View className="flex-1 bg-slate-50">
        {/* Header with Progress */}
        {currentStep !== 'complete' && (
          <Animated.View
            entering={FadeIn}
            className="bg-white border-b border-slate-200 px-6 py-4"
          >
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-slate-900 text-xl font-semibold">
                Configuración Inicial
              </Text>
              <Text className="text-slate-500 text-sm">
                {getStepProgress()}/3
              </Text>
            </View>

            {/* Progress Bar */}
            <View className="flex-row gap-2">
              <View className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <Animated.View
                  style={animatedProgressStyle}
                  className="h-full bg-indigo-600 rounded-full"
                />
              </View>
            </View>
          </Animated.View>
        )}

        {/* Content with animated container */}
        {currentStep !== 'complete' && (
          <Animated.View style={animatedContentStyle} className="flex-1">
            {currentStep === 'user-type' && renderUserTypeSelection()}
            {currentStep === 'professional-info' && renderProfessionalInfo()}
            {currentStep === 'client-info' && renderClientInfo()}
          </Animated.View>
        )}

        {/* Complete screen without container animation */}
        {currentStep === 'complete' && renderComplete()}
      </View>
    </Fragment>
  );
}

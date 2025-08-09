import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSignUp } from '@/modules/core/hooks/use-sign-up';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/core/components/ui/form';
import { Input } from '@/modules/core/components/ui/input';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen() {
  const { form, onSubmit } = useSignUp();
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6">
      {/* Header */}
      <View className="bg-white border-b border-slate-200 py-4">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 -ml-2 mr-3"
          >
            <Ionicons name="arrow-back" size={24} color="#64748B" />
          </TouchableOpacity>
          <View>
            <Text className="text-slate-900 text-xl font-semibold">
              Crear Cuenta
            </Text>
            <Text className="text-slate-500 text-sm">
              Registro de nuevo profesional
            </Text>
          </View>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={'padding'}
        className="flex-1"
        keyboardVerticalOffset={25}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          {/* Content */}
          <View className="py-8">
            <View className="mb-8">
              <View className="w-16 h-16 bg-indigo-100 rounded-full items-center justify-center mb-6 self-center">
                <Ionicons name="person-add" size={32} color="#4F46E5" />
              </View>
              <Text className="text-slate-900 text-2xl font-bold text-center mb-2">
                Únete a nuestro equipo
              </Text>
              <Text className="text-slate-600 text-center">
                Completa el formulario para crear tu cuenta profesional
              </Text>
            </View>

            {/* Form */}
            <View className="mb-6">
              <Form {...form}>
                <View className="gap-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">
                          Nombre completo
                        </FormLabel>
                        <FormControl>
                          <Input
                            testID="name"
                            placeholder="Dr. Juan Pérez"
                            {...field}
                            value={field.value}
                            onChangeText={field.onChange}
                            keyboardType="default"
                            autoCapitalize="words"
                            autoComplete="name"
                            autoCorrect={false}
                            className="bg-slate-50 border-slate-200"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">
                          Correo electrónico
                        </FormLabel>
                        <FormControl>
                          <Input
                            testID="email"
                            placeholder="doctor@ejemplo.com"
                            {...field}
                            value={field.value}
                            onChangeText={field.onChange}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect={false}
                            className="bg-slate-50 border-slate-200"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">
                          Contraseña
                        </FormLabel>
                        <FormControl>
                          <Input
                            testID="password"
                            placeholder="••••••••"
                            {...field}
                            value={field.value}
                            onChangeText={field.onChange}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect={false}
                            secureTextEntry
                            className="bg-slate-50 border-slate-200"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </View>
              </Form>

              {/* Terms and Privacy */}
              <View className="mt-6 p-4 bg-slate-100 rounded-lg">
                <Text className="text-slate-600 text-sm text-center">
                  Al registrarte, aceptas nuestros{' '}
                  <Text className="text-indigo-600 font-medium">
                    Términos de Servicio
                  </Text>{' '}
                  y{' '}
                  <Text className="text-indigo-600 font-medium">
                    Política de Privacidad
                  </Text>
                </Text>
              </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              className="bg-indigo-600 py-4 rounded-xl shadow-sm mb-8"
              activeOpacity={0.8}
              onPress={form.handleSubmit(onSubmit)}
              disabled={form.formState.isSubmitting}
            >
              <View className="flex-row items-center justify-center">
                <Text className="text-center text-white font-semibold text-base">
                  {form.formState.isSubmitting
                    ? 'Creando cuenta...'
                    : 'Crear cuenta'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

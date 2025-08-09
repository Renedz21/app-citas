import { View, Text, TouchableOpacity } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSignIn } from '@/modules/core/hooks/use-sign-in';
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

export default function LoginScreen() {
  const { form, onSubmit } = useSignIn();
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6">
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
              Iniciar Sesión
            </Text>
            <Text className="text-slate-500 text-sm">
              Accede a tu cuenta profesional
            </Text>
          </View>
        </View>
      </View>
      <KeyboardAvoidingView behavior={'padding'} className="flex-1">
        {/* Content */}
        <View className="flex-1 py-8 justify-center">
          <View className="mb-8">
            <View className="w-16 h-16 bg-indigo-100 rounded-full items-center justify-center mb-6 self-center">
              <Ionicons name="medical" size={32} color="#4F46E5" />
            </View>
            <Text className="text-slate-900 text-2xl font-bold text-center mb-2">
              Bienvenido de vuelta
            </Text>
            <Text className="text-slate-600 text-center">
              Ingresa tus credenciales para acceder a tu cuenta
            </Text>
          </View>

          {/* Form */}
          <View className="mb-6">
            <Form {...form}>
              <View className="gap-y-5">
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

            <TouchableOpacity className="mt-4">
              <Text className="text-indigo-600 font-medium text-sm text-right">
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            className="bg-indigo-600 py-4 rounded-xl shadow-sm"
            activeOpacity={0.8}
            onPress={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
          >
            <View className="flex-row items-center justify-center">
              <Text className="text-center text-white font-semibold text-base">
                {form.formState.isSubmitting
                  ? 'Iniciando sesión...'
                  : 'Iniciar sesión'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

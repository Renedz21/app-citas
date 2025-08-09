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
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  const { form, onSubmit } = useSignUp();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-6">
      <KeyboardAvoidingView
        behavior={'padding'}
        className="flex-1"
        keyboardVerticalOffset={85}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mb-12 flex-col gap-4">
            <View className="flex-row items-center justify-start">
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-sm font-semibold text-blue-600">
                  Volver
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-col">
              <Text className="text-4xl font-extrabold text-gray-900">
                Regístrate
              </Text>
              <Text className="mt-2 text-base text-gray-500">
                Crea una cuenta para continuar
              </Text>
            </View>
          </View>

          <View className="flex-col gap-5">
            <Form {...form}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingresa tu nombre"
                        {...field}
                        value={field.value}
                        onChangeText={field.onChange}
                        keyboardType="default"
                        autoCapitalize="none"
                        autoComplete="name"
                        autoCorrect={false}
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
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingresa tu correo electrónico"
                        {...field}
                        value={field.value}
                        onChangeText={field.onChange}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect={false}
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
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingresa tu contraseña"
                        {...field}
                        value={field.value}
                        onChangeText={field.onChange}
                        keyboardType="default"
                        autoCapitalize="none"
                        autoComplete="password"
                        autoCorrect={false}
                        secureTextEntry
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>

            <TouchableOpacity>
              <Text className="mt-1 text-sm font-semibold text-blue-600">
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="mt-10 rounded-2xl bg-blue-600 py-4"
            activeOpacity={0.9}
            onPress={form.handleSubmit(onSubmit)}
          >
            <Text className="text-center text-lg font-semibold text-white">
              {form.formState.isSubmitting ? 'Creando cuenta...' : 'Regístrate'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

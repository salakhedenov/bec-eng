<template>
  <form @submit.prevent="submitHandler">
    <div class="wrapper">
      <div class="logo__container">
        Company Logo
      </div>
      <div class="login__container">
        <div>
          <input
            v-model.trim="email"
            class="input__email"
            type="email"
            placeholder="Введите E-mail"
            :class="{invalid: $v.email.$dirty && !$v.email.required || $v.email.$dirty && !$v.email.email}"
          />
        </div>
        <div>
          <small
            v-if="$v.email.$dirty && !$v.email.required"
            class="helper-text invalid"
          >Поле не дожно быть пустым
          </small>
          <small
            v-else-if="$v.email.$dirty && !$v.email.email"
            class="helper-text invalid"
          >Введите корректный Email
          </small>
        </div>
        <div>
          <input
            v-model.trim="password"
            class="input__email"
            type="password"
            placeholder="Введите пароль"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.dirty && !$v.password.minLength)}"
          />
        </div>
        <div>
          <small
            v-if="$v.password.$dirty && !$v.password.required"
            class="helper-text invalid"
          >Введите пароль
          </small>
          <small
            v-else-if="$v.password.$dirty && !$v.password.minLength"
            class="helper-text invalid"
          >Пароль должен быть не менее {{$v.password.$params.minLength.min}} символов. Сейчас он {{password.length}} символов
          </small>
        </div>
        <button type="submit" class="btn btn--red">Войти</button>
      </div>
    </div>
  </form>
</template>

<script>
// import messages from '@/utils/messages'
import {
  email, required, minLength
} from 'vuelidate/lib/validators'

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: {
      email, required
    },
    password: {
      required, minLength: minLength(6)
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  },
  mounted () {
    // if (messages[this.$route.query.message]) {
    //   this.$message(messages[this.$route.query.message])
    // }
  }
}
</script>

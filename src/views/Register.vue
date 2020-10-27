<template>
  <form @submit.prevent="submitHandler">
    <div class="wrapper">
      <div class="logo__container">
        Company Logo
      </div>
      <div class="register__container">
        <!-- Name -->
        <div>
          <input
            v-model="name"
            class="input__email"
            type="text"
            placeholder="Введите свое имя"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
          />
        </div>
        <div>
          <small
            v-if="$v.name.$dirty && !$v.name.required"
            class="helper-text invalid"
          >Введите свое имя
          </small>
        </div>
        <!-- Email -->
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
        <!-- Password -->
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
        <!-- Department -->
        <div>
          <select
            class="registerSelect"
            id="departmentSelect"
            v-model="departmentId"
          >
            <option
              v-for="department of departments"
              :key="department.id"
              :value="department.id"
            >
             {{department.name}}
            </option>
          </select>
        </div>
        <div>
          <small
            v-if="$v.departmentId.$dirty && !$v.departmentId.required"
            class="helper-text invalid"
          >Введите пароль
          </small>
        </div>
        <!-- Position -->
        <div>
          <select
            class="registerSelect"
            name=""
            id="positionSelect"
            v-model="positionId"
          >
            <option
              v-for="position of positions"
              :key="position.id"
              :value="position.id"
            >
             {{position.name}}
            </option>
          </select>
        </div>
        <div>
          <small
            v-if="$v.positionId.$dirty && !$v.positionId.required"
            class="helper-text invalid"
          >Выберите должность
          </small>
        </div>
        <button type="submit" class="btn btn--red">Войти</button>
      </div>
    </div>
  </form>
</template>

<script>
import {
  email, required, minLength
} from 'vuelidate/lib/validators'

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    name: '',
    departmentId: null,
    positionId: null,
    departments: [],
    positions: []
  }),
  validations: {
    email: {
      email, required
    },
    password: {
      required, minLength: minLength(6)
    },
    name: {
      required
    },
    departmentId: {
      required
    },
    positionId: {
      required
    }
  },
  async mounted () {
    this.departments = await this.$store.dispatch('fetchDepartments')
    this.positions = await this.$store.dispatch('fetchPositions')
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
        positionId: this.positionId,
        departmentId: this.departmentId
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/login')
      } catch (e) {}
    }

    // async fillUpDepartment () {
    //   const departments = await this.$store.dispatch('fetchDepartments')
    //   this.departments = drawings
    //     .map(drawing => {
    //       return {
    //         ...drawing,
    //         developer: this.users.find(u => u.id === drawing.userId).info.name
    //           ? this.users.find(u => u.id === drawing.userId).info.name
    //           : 'No Name'
    //       }
    //     })
    // }
  }
}
</script>

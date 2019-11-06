<template>
   <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="Quote" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-input
        v-decorator="['quote', { rules: [{ required: true, message: 'Please input your quote!' }] }]"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  export default {
    props: {
      addQuote: Function
    },
    data() {
      return {
        formLayout: 'horizontal',
        form: this.$form.createForm(this, { name: 'coordinated' }),
      }
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();

        const self = this;

        this.form.validateFields(function (err, values) {
          if (!err) {
            const { quote } = values;

            self.addQuote(quote);
          }
        });

        this.form.resetFields();
      },
    }
  }
</script>

<style scoped>

</style>
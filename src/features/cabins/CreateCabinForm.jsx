import { useForm } from "react-hook-form";
import PropTypes from 'prop-types'

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";


function CreateCabinForm({ cabinToEdit = {}, onCloseModal })
{
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...cabinValue } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? cabinValue : {}
  });
  const { errors } = formState;


  const onSubmit = (data) =>
  {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin({ newCabin: { ...data, image }, editId },
        {
          onSuccess: () =>
          {
            reset()
            onCloseModal?.()
          }
        }
      )

    else
      createCabin({ ...data, image }, {
        onSuccess: () =>
        {
          reset()
          onCloseModal?.()
        }
      });
  }

  const onError = () => { }


  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >

      <FormRow label='Cabin Name' error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {
          ...register('name',
            {
              required: "This Field is Required"
            }
          )}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {
          ...register('maxCapacity',
            {
              required: "This Field is Required",
              min: {
                value: 1,
                message: 'Capacity should be at least 1'
              }
            }

          )}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {
          ...register('regularPrice',
            {
              required: "This Field is Required",
              min: {
                value: 1,
                message: 'Capacity should be at least 1'
              }
            }

          )}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {
          ...register('discount',
            {
              required: 'This Field is Required',
              validate: (value) =>
              {
                return value <= getValues().regularPrice || 'Discount should be less than regular price'
              }
            }
          )
          } />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {
          ...register('description',
            {
              required: 'This Field is Required'
            }
          )
          }
        />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {
          ...register('image',
            isEditSession ? false : { required: 'This Field is Required' }
          )
          }
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button>{isWorking ? 'is Sending...' : isEditSession ? 'Edit cabin' : 'Create new cabin'}</Button>
      </FormRow>
    </Form>
  );
}


CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.object,
  onCloseModal: PropTypes.func
}

export default CreateCabinForm;

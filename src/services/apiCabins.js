import supabase from './supabase';

export const getCabins = async () =>
{

    let { data, error } = await supabase
        .from('cabins')
        .select('*')

    if (error)
    {
        console.error(error);
        throw new Error('Cabins could not be loaded')
    }

    return data

}

export const createAndEditCabin = async (newCabin, editId) =>
{
    const hasImagePath = newCabin.image?.startsWith?.
        (import.meta.env.VITE_SUPABASE_URL);

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');

    const imagePath = hasImagePath ? newCabin.image : `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;


    // 1. Create/Edit Cabin
    let query = supabase.from('cabins');

    // A. Create cabin
    if (!editId)
        query = query.insert([{ ...newCabin, image: imagePath }])


    // B. Edit cabin
    if (editId)
        query = query.update({ ...newCabin, image: imagePath }).eq('id', editId);


    const { data, error } = await query.select().single();

    if (error)
    {
        console.error(error);
        throw new Error('Cabin could not be insert')
    }

    // 2. Upload Image
    if (hasImagePath) return data;
    const { error: storageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)

    // 3. Delete the cabin IF there was an error uploading image
    if (storageError)
    {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id);
        console.error(storageError);
        throw new Error('Cabin Image could not be uploaded and the cabin was not created')
    }

    return data;

}

export const deleteCabin = async (id) =>
{

    const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);

    if (error)
    {
        console.error(error);
        throw new Error('Cabin could not be delete')
    }

}
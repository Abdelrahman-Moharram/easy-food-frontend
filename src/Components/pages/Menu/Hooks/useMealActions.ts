import { useDeleteMenuMealMutation, useSwapMenuMealMutation, useUpdateMenuMealMutation, useUpdateMenuMealPriceMutation } from "../../../../redux/api/menusApi"

export const useMealActions = (meal: any) => {
    const [updateMeal] = useUpdateMenuMealMutation()
    const [updateMealPrice] = useUpdateMenuMealPriceMutation()
    const [deleteMealMutation] = useDeleteMenuMealMutation()
    const [swapMealMutation] = useSwapMenuMealMutation()

    const updateMealField = (field: string, value: any) => {
        const formData = new FormData()
        formData.append('name', field === 'name' ? value : meal.name || '')
        formData.append('description', field === 'description' ? value : meal.description || '')
        formData.append('price', field === 'price' ? value : meal.price || 0)

        const prices = field === 'prices' ? value : meal.prices || []
        formData.append('prices', JSON.stringify(prices))

        updateMeal({ meal_id: meal.id, form: formData })
    }

    const updatePriceVariant = (price_id: string, field: string, value: any) => {
        const newPrices = meal.prices.map((p: any) =>
            p.id === price_id ? { ...p, [field]: value } : p
        )
        updateMealField('prices', newPrices)
    }

    const addPriceVariant = () => {
        const newPrices = [...(meal.prices || []), { name: 'Size', price: 0 }]
        updateMealField('prices', newPrices)
    }

    const deletePriceVariant = (index: number) => {
        const newPrices = meal.prices.filter((_: any, i: number) => i !== index)
        updateMealField('prices', newPrices)
    }

    const deleteMeal = () => {
        deleteMealMutation({ meal_id: meal.id })
    }

    const swapMeal = (target_id: string) => {
        swapMealMutation({ first_id: meal.id, second_id: target_id })
    }

    return {
        updateMealField,
        updatePriceVariant,
        addPriceVariant,
        deletePriceVariant,
        deleteMeal,
        swapMeal
    }
}

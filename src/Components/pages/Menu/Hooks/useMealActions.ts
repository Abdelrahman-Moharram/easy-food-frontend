import { useDeleteMenuMealMutation, useSwapMenuMealMutation, useUpdateMenuMealMutation } from "../../../../redux/api/menusApi"

export const useMealActions = (meal: any) => {
    const [updateMeal] = useUpdateMenuMealMutation()
    const [deleteMealMutation] = useDeleteMenuMealMutation()
    const [swapMealMutation] = useSwapMenuMealMutation()

    const updateMealField = (field: string, value: string) => {
        const formData = new FormData()
        formData.append('name', field === 'name' ? value : meal.name || '')
        formData.append('description', field === 'description' ? value : meal.description || '')
        formData.append('price', field === 'price' ? value : meal.price || 0)

        updateMeal({ meal_id: meal.id, form: formData })
    }

    const deleteMeal = () => {
        deleteMealMutation({ meal_id: meal.id })
    }

    const swapMeal = (target_id: string) => {
        swapMealMutation({ first_id: meal.id, second_id: target_id })
    }

    return {
        updateMealField,
        deleteMeal,
        swapMeal
    }
}

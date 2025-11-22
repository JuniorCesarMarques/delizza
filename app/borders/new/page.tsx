import NewBorderForm from "@/components/NewBorderForm";


export default function Border() {

    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="font-bold">Nova borda</h1>
            <NewBorderForm />
        </div>
    )
}

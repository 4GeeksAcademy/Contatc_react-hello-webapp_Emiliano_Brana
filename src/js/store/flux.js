const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			
			contacts: [

			],
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			//Create agenda
			createAgenda: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL+`agendas/embrana`, {
						method: "POST",
						headers: { "Content-Type": "application/json" }
					})
					if (resp.status === 201) {
						await getActions().getContacts()
					} if (resp.status === 400) {
						await getActions().getContacts()
					}
				} catch (error) {
					console.log(error)
					return false
				}
			},
			//función para importar contacto
			getContacts: async () => {
				const resp = await fetch(process.env.BACKEND_URL+`agendas/embrana`);
				if(resp.status == 404){
					await getActions().createAgenda()
					return null
					console.log("--->>> NUEVA AGENDA CREADA<---");
				}
				const data = await resp.json();
				setStore({ contacts: data.contacts });
			},

			createContact: async(newContact) => {

				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				const resp = await fetch(process.env.BACKEND_URL+`agendas/embrana/contacts`, {
  				method: "POST",
  				body: JSON.stringify(newContact),
  				headers: myHeaders,
			});
			if(resp.ok)	 {
				await getActions().getContacts();
			}				
			},
			deleteContact: async (contct_id) => {
				const resp = await fetch(process.env.BACKEND_URL+`agendas/embrana/contacts/${contct_id}`, {
					method: "DELETE",
				});
				if (resp.ok) {
					await getActions().getContacts()
				} else {
					console.error("Error al eliminar la tarea");
				}
			},
			editContact: async (id, updatedContact) => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
			
				const resp = await fetch(`${process.env.BACKEND_URL}agendas/embrana/contacts/${id}`, {
					method: "PUT",
					headers: myHeaders,
					body: JSON.stringify(updatedContact),
				});
			
				if (resp.ok) {
					await getActions().getContacts();
				} else {
					console.error("Error al editar el contacto");
				}
			},
		}
	};
};

export default getState;
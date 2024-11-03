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
					const myHeaders = new Headers();
					myHeaders.append("Content-Type", "application/json");
					const resp = await fetch(process.env.BACKEND_URL+`agendas/embrana`, {
						method: "POST",
						headers: { "Content-Type": "application/json" }
					})
					if (resp.status == 201) {
						await getActions().getContacts()
					} if (resp.status == 400) {
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
					await getActions().createAgenda()  // Se crea la nueva agenda usando el método Actions
					return null
				}
				const data = await resp.json();
				console.log(data);
				setStore({contacts: data.contacts})
				console.log(data.contacts)
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
				console.log();
			}		 

}
		}
	};
};

export default getState;
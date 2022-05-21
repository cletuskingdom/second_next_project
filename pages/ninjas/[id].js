export const getStaticPaths = async () => {
	const res = await fetch("https://jsonplaceholder.typicode.com/users");
	const data = await res.json();

	const path = data.map((ninja) => {
		return {
			params: { id: ninja.id.toString() },
		};
	});

	return {
		path,
		fallback: false, // If the id don't exist
	};
};

export const getStaticProps = async (context) => {
	const id = context.params.id;
	const res = fetch("https://jsonplaceholder.typicode.com/users/" + id);
	const data = await (await res).json();

	return {
		props: { ninja: data },
	};
};

const Details = ({ ninja }) => {
	return (
		<div>
			<h1>{ninja.name}</h1>
			<p>{ninja.email}</p>
			<p>{ninja.website}</p>
			<p>{ninja.address.city}</p>
		</div>
	);
};

export default Details;

type ListResultType = {
  name: string;
  species?: string;
};

const ListResult = (props: ListResultType) => {
  return (
    <div>
      <h2>{props.name}</h2>
      {props.species && <p>{props.species}</p>}
    </div>
  );
};

export default ListResult;

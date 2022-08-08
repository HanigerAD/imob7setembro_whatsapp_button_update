export const ImoveisPage = () => {
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Imóveis</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Imóveis</li>
      </ol>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1"></i>
          Imóveis
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

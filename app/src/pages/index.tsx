import { useSubscription, useMutation } from "@apollo/client";
import {
  SubscriptionUsersSubscription,
  CreateUserMutation,
  UpdateUserMutation,
  DeleteUserMutation,
  SubscriptionUsersDocument,
  CreateUserDocument,
  UpdateUserDocument,
  DeleteUserDocument,
} from "@/type/graphql";
import { useState } from "react";

const Page = () => {
  const { data, loading, error } =
    useSubscription<SubscriptionUsersSubscription>(SubscriptionUsersDocument);
  const [createUser] = useMutation<CreateUserMutation>(CreateUserDocument);
  const [updateUser] = useMutation<UpdateUserMutation>(UpdateUserDocument);
  const [deleteUser] = useMutation<DeleteUserMutation>(DeleteUserDocument);

  const [newName, setNewName] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");

  const handleCreateUser = async () => {
    if (!newName) return;
    try {
      await createUser({ variables: { name: newName } });
      setNewName("");
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  const handleEdit = (id: number, name: string) => {
    setEditId(id);
    setEditName(name);
  };

  const handleUpdateUser = async () => {
    if (editId === null || !editName) return;
    try {
      await updateUser({ variables: { id: editId, name: editName } });
      setEditId(null);
      setEditName("");
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser({ variables: { id } });
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  if (loading) return <>loading...</>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Users</h1>

      <div>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter name"
        />
        <button onClick={handleCreateUser}>Create User</button>
      </div>

      <ul>
        {data?.users.map((user) => (
          <li key={user.id}>
            {editId === user.id ? (
              <div>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Edit name"
                />
                <button onClick={handleUpdateUser}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>{user.name}</span>
                <button onClick={() => handleEdit(user.id, user.name)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;

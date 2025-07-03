import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Users } from 'lucide-react';
import { Switch } from "@/components/ui/switch";

interface User {
  id: string;
  firstName: string;
  email: string;
}

export const ENV = {
  BASE_URL: import.meta.env.VITE_URL || 'http://localhost:5000',
};

const CreateGroup = ({ onGroupCreated }: { onGroupCreated: () => void }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [members, setMembers] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')?.user;
  if (!currentUser?.id) return null;

  useEffect(() => {
    if (!currentUser?.id) return;
    axios.get(`${ENV.BASE_URL}/api/users/${currentUser.id}`)
      .then(res => {
        const followIds = res.data.followList || [];
        const followPromises = followIds.map((element) =>
          axios.get(`${ENV.BASE_URL}/api/users/${element._id}`)
            .then(userRes => ({ ...userRes.data, id: userRes.data._id }))
        );
        Promise.all(followPromises).then(setUsers);
      })
      .catch(err => console.error('Failed to fetch follow list:', err));
  }, [currentUser?.id]);

  const handleSubmit = async () => {
    if (!name || !description || members.length === 0) return;
    await axios.post(`${ENV.BASE_URL}/api/groups/create`, {
      name,
      description,
      category,
      creatorId: currentUser.id,
      members,
      progress: 0,
      nextMeeting: 'Monday, 6 PM',
      activeDiscussions: 0,
      isPrivate,
    });
    onGroupCreated();
    setOpen(false);
    setName('');
    setDescription('');
    setMembers([]);
    setSelectAll(false);
  };

  const handleMemberToggle = (id: string) => {
    setMembers(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    setMembers(selectAll ? [] : users.map(u => u.id));
    setSelectAll(!selectAll);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Users className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md p-6 space-y-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create Study Group
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-sm mb-1 block">Group Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter group name"
            />
          </div>

          <div>
            <Label className="text-sm mb-1 block">Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
            />
          </div>

          <div>
            <Label className="text-sm mb-1 block">Category</Label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-900"
            >
              <option value="Electronics">Electronics</option>
              <option value="Software">Software</option>
              <option value="Mechanical">Mechanical</option>
              <option value="AI/ML">AI/ML</option>
            </select>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <Label className="text-sm">Group Visibility</Label>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">Public</span>
              <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
              <span className="text-xs text-muted-foreground">Private</span>
            </div>
          </div>

          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between items-center">
              <Label className="text-sm">Select Members</Label>
              <button
                onClick={handleToggleAll}
                className="text-xs text-blue-600 hover:underline"
              >
                {selectAll ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto pr-1">
              {users.map(user => (
                <label
                  key={user.id}
                  className="flex items-center justify-between border rounded-md p-2 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                >
                  <div>
                    <div className="font-medium text-sm">{user.firstName}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={members.includes(user.id)}
                    onChange={() => handleMemberToggle(user.id)}
                  />
                </label>
              ))}
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Create Group
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Users } from 'lucide-react';
// import { useSocket } from "@/SocketContext"; 
// interface User {
//   id: string;
//   firstName: string;
//   email: string;
// }

// export const ENV = {
//   BASE_URL: import.meta.env.VITE_URL || 'http://localhost:5000',
// };

// const CreateGroup = ({ onGroupCreated }: { onGroupCreated: () => void }) => {
//   const [open, setOpen] = useState(false);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('Electronics');
//   const [members, setMembers] = useState<string[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectAll, setSelectAll] = useState(false);
// const [isPrivate, setIsPrivate] = useState(false);
// // const socket = useSocket();
//   const currentUserRaw = localStorage.getItem('user');  


//   const currentUser = JSON.parse(localStorage.getItem('user') || '{}')?.user;

// if (!currentUser?.id) {
//   console.error('Invalid user in localStorage');
//   return null; // or redirect / show error
// }

//   useEffect(() => {
//     if (!currentUser?.id) return;
//     console.log(currentUser.id)
// axios
//   .get(`${ENV.BASE_URL}/api/users/${currentUser.id}`)
//   .then((res) => {
//     const followIds = res.data.followList || [];
//     console.log("followPromises",followIds)
//     // Fetch details for each followed user
//     const followPromises = followIds.map((element) =>
//       axios.get(`${ENV.BASE_URL}/api/users/${element._id}`).then(userRes => ({
//         ...userRes.data,
//         id: userRes.data._id
//       }))
//     );

//     Promise.all(followPromises).then((followUsers) => {
//       setUsers(followUsers);
//     });
//   })
//   .catch((err) => console.error('Failed to fetch follow list:', err));

//   }, [currentUser?.id]);

//   const handleSubmit = async () => {
//     if (!name || !description || members.length === 0) return;

//     await axios.post(`${ENV.BASE_URL}/api/groups/create`, {
//       name,
//       description,
//       category,
//  creatorId: currentUser.id, 
//        members,
//       progress: 0,
//       nextMeeting: 'Monday, 6 PM',
//       activeDiscussions: 0,
//       isPrivate, 
//     });

//     onGroupCreated();
//     setOpen(false);
//     setName('');
//     setDescription('');
//     setMembers([]);
//     setSelectAll(false);
//   };

//   const handleMemberToggle = (id: string) => {
//     setMembers((prev) =>
//       prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
//     );
//   };

//   const handleToggleAll = () => {
//     if (selectAll) {
//       setMembers([]);
//     } else {
//       const allIds = users.map((user) => user.id);
//       setMembers(allIds);
//     }
//     setSelectAll(!selectAll);
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button>
//           <Users className="mr-2 h-4 w-4" />
//           Create Group
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Create Study Group</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4">
//           <div>
//             <Label>Group Name</Label>
//             <Input value={name} onChange={(e) => setName(e.target.value)} />
//           </div>
//           <div>
//             <Label>Description</Label>
//             <Input
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>
//           <div>
//             <Label>Category</Label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md dark:bg-gray-900"
//             >
//               <option value="Electronics">Electronics</option>
//               <option value="Software">Software</option>
//               <option value="Mechanical">Mechanical</option>
//               <option value="AI/ML">AI/ML</option>
//             </select>
//           </div>
//         <div>
//   <Label>Group Type</Label>
//   <div className="flex items-center gap-2">
//     <input
//       type="checkbox"
//       checked={isPrivate}
//       onChange={(e) => setIsPrivate(e.target.checked)}
//     />
//     <span className="text-sm">
//       {isPrivate ? 'Private Group' : 'Public Group'}
//     </span>
//   </div>
// </div>

//           <div>
//             <Label>Select Members</Label>
//             <div className="mb-2">
//               <input
//                 type="checkbox"
//                 checked={selectAll}
//                 onChange={handleToggleAll}
//                 className="mr-2"
//               />
//               <span className="text-sm font-medium">
//                 {selectAll ? 'Deselect All' : 'Select All'}
//               </span>
//             </div>
//             <div className="h-40 overflow-y-auto border rounded p-2 space-y-2">
//               {users.map((user) => (
//                 <div key={user.id} className="flex items-start justify-between">
//                   <label className="flex items-center gap-2 w-full">
//                     <input
//                       type="checkbox"
//                       checked={members.includes(user.id)}
//                       onChange={() => handleMemberToggle(user.id)}
//                     />
//                     <div>
//                       <div className="font-medium">{user.firstName}</div>
//                       <div className="text-xs text-muted-foreground">
//                         {user.email}
//                       </div>
//                     </div>
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <Button onClick={handleSubmit} className="w-full">
//             Create Group
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CreateGroup;



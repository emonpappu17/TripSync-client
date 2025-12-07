// import ProfileEditForm from '@/components/modules/profile/ProfileEditForm';
import ProfileEditForm from '@/components/modules/profile/ProfileEditForm';
import { BackButton } from '@/components/shared/BackButton';
import { Card } from '@/components/ui/card';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { IUser } from '@/types/user.interface';

const ProfileEditPage = async () => {
    const user: IUser = await getUserInfo();
    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-3xl">
                <BackButton label="Back to Profile" />
                <Card className="p-8">
                    <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
                    <ProfileEditForm user={user} />
                </Card>
            </div>
        </div>
    );
};

export default ProfileEditPage;